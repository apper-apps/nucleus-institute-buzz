import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";
import studentService from "@/services/api/studentService";

const StudentModal = ({ isOpen, onClose, onStudentAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    phone: "",
    email: "",
    enrollmentDate: new Date().toISOString().split("T")[0]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.course || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newStudent = await studentService.create({
        ...formData,
        status: "Active"
      });
      
      onStudentAdded(newStudent);
      toast.success("Student added successfully!");
      
      // Reset form
      setFormData({
        name: "",
        course: "",
        phone: "",
        email: "",
        enrollmentDate: new Date().toISOString().split("T")[0]
      });
      
      onClose();
    } catch (error) {
      toast.error("Failed to add student. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <ApperIcon name="UserPlus" size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold font-display text-slate-900">Add New Student</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ApperIcon name="X" size={20} className="text-slate-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <FormField
            label="Full Name *"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter student's full name"
          />
          
          <FormField
            label="Course *"
            type="text"
            value={formData.course}
            onChange={(e) => handleInputChange("course", e.target.value)}
            placeholder="e.g., Web Development, Data Science"
          />
          
          <FormField
            label="Phone Number *"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Enter phone number"
          />
          
          <FormField
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter email address"
          />
          
          <FormField
            label="Enrollment Date"
            type="date"
            value={formData.enrollmentDate}
            onChange={(e) => handleInputChange("enrollmentDate", e.target.value)}
          />
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Adding...
                </div>
              ) : (
                "Add Student"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;