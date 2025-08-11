import enquiriesData from "@/services/mockData/enquiries.json";

class EnquiryService {
  constructor() {
    this.enquiries = [...enquiriesData];
  }

  // Simulate API delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get all enquiries
  async getAll() {
    await this.delay();
    return [...this.enquiries];
  }

  // Get enquiry by Id
  async getById(id) {
    await this.delay();
    const enquiry = this.enquiries.find(e => e.Id === parseInt(id));
    if (!enquiry) {
      throw new Error(`Enquiry with Id ${id} not found`);
    }
    return { ...enquiry };
  }

  // Create new enquiry
  async create(enquiryData) {
    await this.delay();
    
    const maxId = Math.max(...this.enquiries.map(e => e.Id), 0);
    const newEnquiry = {
      ...enquiryData,
      Id: maxId + 1,
      enquiryDate: enquiryData.enquiryDate || new Date().toISOString().split("T")[0],
      status: enquiryData.status || "New"
    };
    
    this.enquiries.push(newEnquiry);
    return { ...newEnquiry };
  }

  // Update enquiry
  async update(id, updateData) {
    await this.delay();
    
    const index = this.enquiries.findIndex(e => e.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Enquiry with Id ${id} not found`);
    }
    
    this.enquiries[index] = { ...this.enquiries[index], ...updateData };
    return { ...this.enquiries[index] };
  }

  // Delete enquiry
  async delete(id) {
    await this.delay();
    
    const index = this.enquiries.findIndex(e => e.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Enquiry with Id ${id} not found`);
    }
    
    const deletedEnquiry = this.enquiries.splice(index, 1)[0];
    return { ...deletedEnquiry };
  }

  // Get enquiries by status
  async getByStatus(status) {
    await this.delay();
    return this.enquiries.filter(e => 
      e.status.toLowerCase() === status.toLowerCase()
    ).map(e => ({ ...e }));
  }

  // Get enquiries by course interest
  async getByCourse(course) {
    await this.delay();
    return this.enquiries.filter(e => 
      e.interestedCourse.toLowerCase().includes(course.toLowerCase())
    ).map(e => ({ ...e }));
  }

  // Search enquiries
  async search(query) {
    await this.delay();
    const searchTerm = query.toLowerCase();
    return this.enquiries.filter(e =>
      e.name.toLowerCase().includes(searchTerm) ||
      e.interestedCourse.toLowerCase().includes(searchTerm) ||
      e.phone.includes(searchTerm) ||
      (e.email && e.email.toLowerCase().includes(searchTerm))
    ).map(e => ({ ...e }));
  }

  // Get pending follow-ups
  async getPendingFollowUps() {
    await this.delay();
    const today = new Date().toISOString().split("T")[0];
    return this.enquiries.filter(e => 
      e.followUpDate && e.followUpDate <= today && e.status.toLowerCase() !== "converted"
    ).map(e => ({ ...e }));
  }
}

export default new EnquiryService();