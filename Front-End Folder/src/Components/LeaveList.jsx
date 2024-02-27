import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LeavePending from './LeavePending';
import AllLeave from './AllLeave';

function LeaveList() {
  return (
    <div className="px-5 mt-3">
    <Tabs>
        <TabList>
        <Tab>Pending</Tab>
        <Tab>All Leave Request</Tab>
        </TabList>

        <TabPanel>
        <LeavePending/>
        </TabPanel>
        <TabPanel>
        <AllLeave/>
        </TabPanel>
    </Tabs>
    </div>
  )
}

export default LeaveList