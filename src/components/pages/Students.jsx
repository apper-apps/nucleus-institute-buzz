import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import StudentsTable from "@/components/organisms/StudentsTable";
import StudentModal from "@/components/organisms/StudentModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import studentService from "@/services/api/studentService";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadStudents = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await studentService.getAll();
      setStudents(data);
    } catch (err) {
      setError("Failed to load students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleStudentAdded = (newStudent) => {
    setStudents(prev => [...prev, newStudent]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadStudents} />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Students</h1>
          <p className="text-slate-600 mt-1">Manage enrolled students and their information</p>
        </div>
        <Button onClick={handleOpenModal} className="shrink-0">
          <ApperIcon name="UserPlus" size={16} className="mr-2" />
          Add Student
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search students by name, course, or phone..."
          />
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <span>{students.length} Total Students</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{students.filter(s => s.status === "Active").length} Active</span>
          </div>
        </div>
      </div>

      {/* Content */}
      {students.length === 0 ? (
        <Empty
          icon="Users"
          title="No students enrolled yet"
          description="Start building your student database by adding your first student enrollment"
          actionLabel="Add Student"
          onAction={handleOpenModal}
        />
      ) : (
        <StudentsTable students={students} searchTerm={searchTerm} />
      )}

      {/* Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onStudentAdded={handleStudentAdded}
      />
    </div>
  );
};

export default Students;