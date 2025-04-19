
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { BackendInfo } from '@/components/BackendInfo';
import { mockDevices, mockRooms } from '@/data/mockData';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-light">
      <Header />
      <Dashboard devices={mockDevices} rooms={mockRooms} />
      <div className="max-w-7xl mx-auto px-4">
        <BackendInfo />
      </div>
    </div>
  );
};

export default Index;
