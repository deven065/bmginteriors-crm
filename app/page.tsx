import React from 'react';
import StatCards from './components/StatCards';
import ProjectProgress from './components/ProjectProgress';
import RecentProjects from './components/RecentProjects';
import AllProjects from './components/AllProjects';
import UpcomingTasks from './components/UpcomingTasks';
import AttendanceSummary from './components/AttendanceSummary';
import RecentSiteImages from './components/RecentSiteImages';
import Workers from './components/Workers';
import TasksOverview from './components/TasksOverview';
import ReportsAnalytics from './components/ReportsAnalytics';

export default function Dashboard() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-6">
      <StatCards />
      
      {/* Row 1: Graphical Overview Circles and visual highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4 h-full">
          <ProjectProgress />
        </div>
        <div className="xl:col-span-4 h-full">
          <AttendanceSummary />
        </div>
        <div className="xl:col-span-4 h-full">
          <RecentSiteImages />
        </div>
      </div>

      {/* Row 2: Projects Status & Detail list */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4">
          <RecentProjects />
        </div>
        <div className="xl:col-span-8">
          <AllProjects />
        </div>
      </div>

      {/* Row 3: Upcoming schedules and central active task table */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4">
          <UpcomingTasks />
        </div>
        <div className="xl:col-span-8">
          <TasksOverview />
        </div>
      </div>

      {/* Row 4: Personnel resource list and global analytics details */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-5">
          <Workers />
        </div>
        <div className="xl:col-span-7">
          <ReportsAnalytics />
        </div>
      </div>
    </div>
  );
}
