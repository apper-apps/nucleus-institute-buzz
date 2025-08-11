import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const EnquiriesTable = ({ enquiries, searchTerm }) => {
  const filteredEnquiries = enquiries.filter(enquiry =>
    enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.interestedCourse.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.phone.includes(searchTerm)
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-yellow-100 text-yellow-800";
      case "converted":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Prospect</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Interested Course</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Contact</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Enquiry Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Follow-up</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredEnquiries.map((enquiry) => (
              <tr key={enquiry.Id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <ApperIcon name="MessageCircle" size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{enquiry.name}</div>
                      <div className="text-sm text-slate-500">ID: {enquiry.Id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ApperIcon name="BookOpen" size={16} className="text-slate-400" />
                    <span className="text-slate-900 font-medium">{enquiry.interestedCourse}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <ApperIcon name="Phone" size={14} className="text-slate-400" />
                      <span>{enquiry.phone}</span>
                    </div>
                    {enquiry.email && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <ApperIcon name="Mail" size={14} className="text-slate-400" />
                        <span>{enquiry.email}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600">
                    {format(new Date(enquiry.enquiryDate), "MMM dd, yyyy")}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(enquiry.status)}`}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${enquiry.status.toLowerCase() === "new" ? "bg-blue-400" : enquiry.status.toLowerCase() === "contacted" ? "bg-yellow-400" : enquiry.status.toLowerCase() === "converted" ? "bg-green-400" : "bg-slate-400"}`}></div>
                    {enquiry.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {enquiry.followUpDate ? (
                    <div className="text-sm text-slate-600">
                      {format(new Date(enquiry.followUpDate), "MMM dd, yyyy")}
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400">Not set</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredEnquiries.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="MessageCircle" size={24} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No enquiries found</h3>
          <p className="text-slate-500">
            {searchTerm ? "Try adjusting your search terms" : "New enquiries will appear here"}
          </p>
        </div>
      )}
    </div>
  );
};

export default EnquiriesTable;