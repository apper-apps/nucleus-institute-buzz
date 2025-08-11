import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";
import studentService from "@/services/api/studentService";

const StudentModal = ({ isOpen, onClose, onStudentAdded, mode = "add", student = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    phone: "",
    email: "",
    enrollmentDate: new Date().toISOString().split("T")[0]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Initialize form data when student prop changes
  React.useEffect(() => {
    if (student && mode === "detail") {
      setFormData({
        name: student.name || "",
        course: student.course || "",
        phone: student.phone || "",
        email: student.email || "",
        enrollmentDate: student.enrollmentDate || new Date().toISOString().split("T")[0]
      });
      setIsEditing(false);
    } else {
      resetForm();
    }
  }, [student, mode]);
const resetForm = () => {
    setFormData({
      name: "",
      course: "",
      phone: "",
      email: "",
      enrollmentDate: new Date().toISOString().split("T")[0]
    });
  };

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
      let result;
      if (mode === "add") {
        result = await studentService.create({
          ...formData,
          status: "Active"
        });
        toast.success("Student added successfully!");
      } else {
        result = await studentService.update(student.Id, formData);
        toast.success("Student updated successfully!");
        setIsEditing(false);
      }
      
      onStudentAdded(result);
      
      if (mode === "add") {
        resetForm();
        onClose();
      }
    } catch (error) {
      const action = mode === "add" ? "add" : "update";
      toast.error(`Failed to ${action} student. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    // Reset form data to original student data
    if (student) {
      setFormData({
        name: student.name || "",
        course: student.course || "",
        phone: student.phone || "",
        email: student.email || "",
        enrollmentDate: student.enrollmentDate || new Date().toISOString().split("T")[0]
      });
    }
    setIsEditing(false);
  };

  if (!isOpen) return null;

if (!isOpen) return null;

  const isDetailMode = mode === "detail";
  const isViewMode = isDetailMode && !isEditing;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <ApperIcon 
                name={isDetailMode ? "User" : "UserPlus"} 
                size={20} 
                className="text-white" 
              />
            </div>
            <h2 className="text-xl font-bold font-display text-slate-900">
              {isDetailMode 
                ? isEditing 
                  ? "Edit Student" 
                  : "Student Details"
                : "Add New Student"
              }
            </h2>
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
            disabled={isViewMode}
          />
          
          <FormField
            label="Course *"
            type="text"
            value={formData.course}
            onChange={(e) => handleInputChange("course", e.target.value)}
            placeholder="e.g., Web Development, Data Science"
            disabled={isViewMode}
          />
          
          <FormField
            label="Phone Number *"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Enter phone number"
            disabled={isViewMode}
          />
          
          <FormField
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter email address"
            disabled={isViewMode}
          />
          
          <FormField
            label="Enrollment Date"
            type="date"
            value={formData.enrollmentDate}
            onChange={(e) => handleInputChange("enrollmentDate", e.target.value)}
            disabled={isViewMode}
          />
          
          {isDetailMode && student?.status && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Status
              </label>
              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                student.status === 'Active' 
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-800'
              }`}>
                {student.status}
              </div>
            </div>
          )}
          
          <div className="flex gap-3 pt-4">
            {isViewMode ? (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  type="button"
                  onClick={handleEdit}
                  className="flex-1"
                >
                  <ApperIcon name="Edit" size={16} className="mr-2" />
                  Edit
                </Button>
              </>
            ) : isEditing ? (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancelEdit}
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
                      Saving...
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;