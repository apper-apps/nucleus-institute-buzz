import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";
import enquiryService from "@/services/api/enquiryService";

const EnquiryModal = ({ isOpen, onClose, onEnquiryAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    interestedCourse: "",
    phone: "",
    email: "",
    enquiryDate: new Date().toISOString().split("T")[0],
    followUpDate: ""
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
    
    if (!formData.name || !formData.interestedCourse || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newEnquiry = await enquiryService.create({
        ...formData,
        status: "New"
      });
      
      onEnquiryAdded(newEnquiry);
      toast.success("Enquiry added successfully!");
      
      // Reset form
      setFormData({
        name: "",
        interestedCourse: "",
        phone: "",
        email: "",
        enquiryDate: new Date().toISOString().split("T")[0],
        followUpDate: ""
      });
      
      onClose();
    } catch (error) {
      toast.error("Failed to add enquiry. Please try again.");
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
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
              <ApperIcon name="MessageCirclePlus" size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold font-display text-slate-900">Add New Enquiry</h2>
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
            placeholder="Enter prospect's full name"
          />
          
          <FormField
            label="Interested Course *"
            type="text"
            value={formData.interestedCourse}
            onChange={(e) => handleInputChange("interestedCourse", e.target.value)}
            placeholder="e.g., Python Programming, Web Design"
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
            label="Follow-up Date"
            type="date"
            value={formData.followUpDate}
            onChange={(e) => handleInputChange("followUpDate", e.target.value)}
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
                "Add Enquiry"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;