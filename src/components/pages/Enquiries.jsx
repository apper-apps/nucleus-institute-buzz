import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import EnquiriesTable from "@/components/organisms/EnquiriesTable";
import EnquiryModal from "@/components/organisms/EnquiryModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import enquiryService from "@/services/api/enquiryService";

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadEnquiries = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await enquiryService.getAll();
      setEnquiries(data);
    } catch (err) {
      setError("Failed to load enquiries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleEnquiryAdded = (newEnquiry) => {
    setEnquiries(prev => [...prev, newEnquiry]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadEnquiries} />;

  const newEnquiries = enquiries.filter(e => e.status.toLowerCase() === "new").length;
  const contactedEnquiries = enquiries.filter(e => e.status.toLowerCase() === "contacted").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Enquiries</h1>
          <p className="text-slate-600 mt-1">Track and manage prospective student enquiries</p>
        </div>
        <Button onClick={handleOpenModal} className="shrink-0">
          <ApperIcon name="MessageCirclePlus" size={16} className="mr-2" />
          Add Enquiry
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search enquiries by name, course, or phone..."
          />
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>{newEnquiries} New</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>{contactedEnquiries} Contacted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
            <span>{enquiries.length} Total</span>
          </div>
        </div>
      </div>

      {/* Content */}
      {enquiries.length === 0 ? (
        <Empty
          icon="MessageCircle"
          title="No enquiries recorded yet"
          description="Start tracking potential students by logging enquiries and following up on leads"
          actionLabel="Add Enquiry"
          onAction={handleOpenModal}
        />
      ) : (
        <EnquiriesTable enquiries={enquiries} searchTerm={searchTerm} />
      )}

      {/* Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEnquiryAdded={handleEnquiryAdded}
      />
    </div>
  );
};

export default Enquiries;