"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { SummaryCard } from "./SummaryCard";
import { MattersTable } from "./MattersTable";

import {
  fetchMatters,
  fetchSummaryData,
  postMatter,
  fetchLawyer,
  fetchClient,
} from "../../lib/apiService.ts";

import { MatterDto } from "../types/matterTypes";


export function Matters() {
  const [summaryData, setSummaryData] = useState([]);
  const [mattersData, setMattersData] = useState([]);
  const [lawyersData, setLawyersData] = useState([]);
  const [clientsData, setClientsData] = useState([]);
  const { toast } = useToast()

  useEffect(() => {
    loadSummaryData();
    loadMatters();
    loadClients();
    loadLawyers();
  }, []);

  const loadSummaryData = async () => {
    try {
      const data = await fetchSummaryData();
      setSummaryData(data);
    } catch (error) {
      console.log("Failed to fetch summary data:", error);
    }
  };

  const loadMatters = async (page: 1, limit: 10) => {
    try {
      const data = await fetchMatters({ page, limit });
      setMattersData(data);
    } catch (error) {
      console.log("Failed to fetch summary data:", error);
    }
  };
  const loadClients = async () => {
    try {
      const data = await fetchClient();
      setClientsData(data);
    } catch (error) {
      console.log("Failed to fetch summary data:", error);
    }
  };
  const loadLawyers = async () => {
    try {
      const data = await fetchLawyer();
      setLawyersData(data);
    } catch (error) {
      console.log("Failed to fetch summary data:", error);
    }
  };

  const handlePagination = (page) => {
    loadMatters(page);
  };

  const handlePostMatters = async (e: MatterDto) => {
    try {
      const data = await postMatter(e);
      if(data) {
        loadMatters()
        loadSummaryData()
        toast({
          title: "Matter Added Successfully",
        })
      }
    } catch (error) {
      console.log("Failed to fetch summary data:", error);
    }
  };
  return (
    <>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid gap-8">
          <SummaryCard summary={summaryData} />
          <MattersTable
            mattersData={mattersData}
            clients={clientsData}
            lawyers={lawyersData}
            onPageChange={(e) => handlePagination(e)}
            onAddMatter={e => handlePostMatters(e)}
          />
        </div>
      </div>
    </>
  );
}
