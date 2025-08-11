import React, { useState, useEffect } from "react";
import StatCard from "@/components/molecules/StatCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import { format } from "date-fns";
import studentService from "@/services/api/studentService";
import enquiryService from "@/services/api/enquiryService";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [studentsData, enquiriesData] = await Promise.all([
        studentService.getAll(),
        enquiryService.getAll()
      ]);
      
      setStudents(studentsData);
      setEnquiries(enquiriesData);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  const totalStudents = students.length;
  const pendingEnquiries = enquiries.filter(e => e.status.toLowerCase() === "new").length;
  const recentEnquiries = enquiries
    .sort((a, b) => new Date(b.enquiryDate) - new Date(a.enquiryDate))
    .slice(0, 5);
  const recentStudents = students
    .sort((a, b) => new Date(b.enrollmentDate) - new Date(a.enrollmentDate))
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">Welcome Back!</h1>
            <p className="text-primary-100 text-lg">
              Here's what's happening at Deshmukh Computer Institute today
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <ApperIcon name="Calendar" size={24} />
            </div>
            <div className="text-right">
              <div className="text-sm text-primary-200">Today</div>
              <div className="font-semibold">
                {format(new Date(), "EEEE, MMMM do")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon="Users"
          gradient="from-primary-500 to-primary-600"
          iconColor="bg-primary-600/20 text-white"
          trend="+12% this month"
        />
        <StatCard
          title="Pending Enquiries"
          value={pendingEnquiries}
          icon="MessageCircle"
          gradient="from-amber-500 to-orange-500"
          iconColor="bg-white/20 text-white"
          trend={`${pendingEnquiries} need follow-up`}
        />
        <StatCard
          title="Active Courses"
          value="8"
          icon="BookOpen"
          gradient="from-emerald-500 to-teal-500"
          iconColor="bg-white/20 text-white"
          trend="All courses running"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enquiries */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                  <ApperIcon name="MessageCircle" size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Recent Enquiries</h3>
              </div>
              <span className="text-sm text-slate-500">Last 5</span>
            </div>
          </Card.Header>
          <Card.Content>
            {recentEnquiries.length > 0 ? (
              <div className="space-y-4">
                {recentEnquiries.map((enquiry) => (
                  <div key={enquiry.Id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                      <ApperIcon name="User" size={14} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{enquiry.name}</p>
                      <p className="text-sm text-slate-500 truncate">{enquiry.interestedCourse}</p>
                    </div>
                    <div className="text-xs text-slate-400">
                      {format(new Date(enquiry.enquiryDate), "MMM dd")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <ApperIcon name="MessageCircle" size={32} className="mx-auto mb-2 text-slate-300" />
                <p>No recent enquiries</p>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Recent Students */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                  <ApperIcon name="Users" size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Recent Enrollments</h3>
              </div>
              <span className="text-sm text-slate-500">Last 5</span>
            </div>
          </Card.Header>
          <Card.Content>
            {recentStudents.length > 0 ? (
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div key={student.Id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <ApperIcon name="User" size={14} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{student.name}</p>
                      <p className="text-sm text-slate-500 truncate">{student.course}</p>
                    </div>
                    <div className="text-xs text-slate-400">
                      {format(new Date(student.enrollmentDate), "MMM dd")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <ApperIcon name="Users" size={32} className="mx-auto mb-2 text-slate-300" />
                <p>No recent enrollments</p>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg border border-primary-200 hover:from-primary-100 hover:to-primary-200 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-500 rounded-lg">
                  <ApperIcon name="UserPlus" size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-primary-900">Add Student</p>
                  <p className="text-sm text-primary-600">Enroll new student</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200 hover:from-emerald-100 hover:to-emerald-200 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <ApperIcon name="MessageCirclePlus" size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-emerald-900">Log Enquiry</p>
                  <p className="text-sm text-emerald-600">Record new inquiry</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200 hover:from-amber-100 hover:to-amber-200 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500 rounded-lg">
                  <ApperIcon name="Calendar" size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-amber-900">Schedule Follow-up</p>
                  <p className="text-sm text-amber-600">Plan next contact</p>
                </div>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Dashboard;