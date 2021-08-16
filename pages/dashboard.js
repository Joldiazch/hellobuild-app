import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import ClientOnly from '../components/ClientOnly';

const DashboardPage = () => {
    return(
        <ClientOnly>
          <Dashboard />
        </ClientOnly>
    )
}

export default DashboardPage;