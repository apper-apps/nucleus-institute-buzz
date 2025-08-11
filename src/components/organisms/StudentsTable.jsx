import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const StudentsTable = ({ students, searchTerm }) => {
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phone.includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Student</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Course</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Contact</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Enrollment</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredStudents.map((student) => (
              <tr key={student.Id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <ApperIcon name="User" size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{student.name}</div>
                      <div className="text-sm text-slate-500">ID: {student.Id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ApperIcon name="BookOpen" size={16} className="text-slate-400" />
                    <span className="text-slate-900 font-medium">{student.course}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <ApperIcon name="Phone" size={14} className="text-slate-400" />
                      <span>{student.phone}</span>
                    </div>
                    {student.email && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <ApperIcon name="Mail" size={14} className="text-slate-400" />
                        <span>{student.email}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600">
                    {format(new Date(student.enrollmentDate), "MMM dd, yyyy")}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredStudents.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Users" size={24} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No students found</h3>
          <p className="text-slate-500">
            {searchTerm ? "Try adjusting your search terms" : "Start by adding your first student"}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentsTable;