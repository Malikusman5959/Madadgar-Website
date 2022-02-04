import React from 'react'
import { TabPanel, useTabs } from 'react-headless-tabs';
import { TabSelector } from './TabSelector';
import './../../style/tabs.css'


//Component imports
import PostedJobsList from './PostedJobsList';
import ActiveJobList from './ActiveJobList';
import JobHistory from './JobHistory';
import RequestedJobList from './RequestedJobList';




const CustomersPostedJob = () => {

    const [selectedTab, setSelectedTab] = useTabs([
        'Posted Jobs',
        'Active Jobs',
        'Jobs History',
        'Requested Jobs'
    ]);

    return (
        <div>
            <div className="FisrtDiv">
                <h1 style={{ fontSize: "25px", textAlign: "center", fontWeight: "900", margin: "2px", fontFamily: "Roboto , sans-serif" ,color:"#ffc107", padding:"1%" }}>Manage your Jobs</h1>
            </div>
            <div className="2ndDiv">
                <>
                    <nav className="tab1" >
                        <TabSelector
                            isActive={selectedTab === 'Posted Jobs'}
                            onClick={() => setSelectedTab('Posted Jobs')}
                        >
                            My Posted Jobs
                        </TabSelector>

                        <TabSelector
                            isActive={selectedTab === 'Active Jobs'}
                            onClick={() => setSelectedTab('Active Jobs')}
                        >
                            Active Jobs
                        </TabSelector>

                        <TabSelector
                            isActive={selectedTab === 'Requested Jobs'}
                            onClick={() => setSelectedTab('Requested Jobs')}
                        >
                            Requested Jobs
                        </TabSelector>

                        <TabSelector
                            isActive={selectedTab === 'Jobs History'}
                            onClick={() => setSelectedTab('Jobs History')}
                        >
                            Jobs history
                        </TabSelector>

                    </nav>
                    <div className="p-4">
                        <TabPanel hidden={selectedTab !== 'Posted Jobs'}>

                            <PostedJobsList setSelectedTab={setSelectedTab} selectedTab={selectedTab} />

                        </TabPanel>

                        <TabPanel hidden={selectedTab !== 'Active Jobs'}>

                            <ActiveJobList setSelectedTab={setSelectedTab} selectedTab={selectedTab} />

                        </TabPanel>

                        <TabPanel hidden={selectedTab !== 'Requested Jobs'}>

                            <RequestedJobList setSelectedTab={setSelectedTab} selectedTab={selectedTab} />

                        </TabPanel>

                        <TabPanel hidden={selectedTab !== 'Jobs History'}>

                            <JobHistory setSelectedTab={setSelectedTab} selectedTab={selectedTab} />

                        </TabPanel>


                    </div>
                </>
            </div>
        </div>
    )
}

export default CustomersPostedJob
