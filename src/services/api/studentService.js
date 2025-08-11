import studentsData from "@/services/mockData/students.json";

class StudentService {
  constructor() {
    this.students = [...studentsData];
  }

  // Simulate API delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get all students
  async getAll() {
    await this.delay();
    return [...this.students];
  }

  // Get student by Id
  async getById(id) {
    await this.delay();
    const student = this.students.find(s => s.Id === parseInt(id));
    if (!student) {
      throw new Error(`Student with Id ${id} not found`);
    }
    return { ...student };
  }

  // Create new student
  async create(studentData) {
    await this.delay();
    
    const maxId = Math.max(...this.students.map(s => s.Id), 0);
    const newStudent = {
      ...studentData,
      Id: maxId + 1,
      enrollmentDate: studentData.enrollmentDate || new Date().toISOString().split("T")[0]
    };
    
    this.students.push(newStudent);
    return { ...newStudent };
  }

  // Update student
  async update(id, updateData) {
    await this.delay();
    
    const index = this.students.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Student with Id ${id} not found`);
    }
    
    this.students[index] = { ...this.students[index], ...updateData };
    return { ...this.students[index] };
  }

  // Delete student
  async delete(id) {
    await this.delay();
    
    const index = this.students.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Student with Id ${id} not found`);
    }
    
    const deletedStudent = this.students.splice(index, 1)[0];
    return { ...deletedStudent };
  }

  // Get students by course
  async getByCourse(course) {
    await this.delay();
    return this.students.filter(s => 
      s.course.toLowerCase().includes(course.toLowerCase())
    ).map(s => ({ ...s }));
  }

  // Search students
  async search(query) {
    await this.delay();
    const searchTerm = query.toLowerCase();
    return this.students.filter(s =>
      s.name.toLowerCase().includes(searchTerm) ||
      s.course.toLowerCase().includes(searchTerm) ||
      s.phone.includes(searchTerm) ||
      (s.email && s.email.toLowerCase().includes(searchTerm))
    ).map(s => ({ ...s }));
  }
}

export default new StudentService();