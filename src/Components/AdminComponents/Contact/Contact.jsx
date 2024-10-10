import React, { useEffect, useState } from "react";
import axios from "axios";
import URL from "../../../apiconfig";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    designation: "",
    photo: "",
  });
  const [newPhoto, setNewPhoto] = useState(null);

  useEffect(() => {
    fetchContacts();
    fetchMessages();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${URL}/api/contactus`);
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      alert("Error fetching contacts");
    }
  };

  const fetchMessages = async () => {
    try {
      const Authorization = localStorage.getItem("token");
      const response = await axios.get(`${URL}/api/contactus/message/filter`, {
        headers: { Authorization },
      });

      // Format the createdAt date for each message
      const formattedMessages = response.data.map((message) => {
        const dateString = message.createdAt;
        const date = new Date(dateString);

        // Extract hours, minutes, day, month, and year
        const hours = String(date.getUTCHours()).padStart(2, "0");
        const minutes = String(date.getUTCMinutes()).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");
        const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const year = String(date.getUTCFullYear()).slice(-2); // Get last two digits of the year

        // Format the date
        const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;

        // Return the message with the formatted date
        return { ...message, formattedDate };
      });

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("Error Fetching messages");
    }
  };

  const handleMessageDelete = async (id) => {
    try {
      const Authorization = localStorage.getItem("token");
      await axios.delete(`${URL}/api/contactus/message/${id}`, {
        headers: { Authorization },
      });
      setContacts(contacts.filter((contact) => contact._id !== id));
      fetchMessages();
      alert("message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Error deleting message");
    }
  };

  const handleDelete = async (id) => {
    try {
      const Authorization = localStorage.getItem("token");
      await axios.delete(`${URL}/api/contactus/${id}`, {
        headers: { Authorization },
      });
      setContacts(contacts.filter((contact) => contact._id !== id));
      alert("Contact deleted successfully");
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Error deleting contact");
    }
  };

  const handleUpdate = (contact) => {
    setSelectedContact(contact);
    setFormData({
      fullname: contact.fullname,
      phone: contact.phone,
      email: contact.email,
      designation: contact.designation,
      photo: contact.photo,
    });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("upload", file);

    try {
      const Authorization = localStorage.getItem("token");
      const response = await axios.post(`${URL}/api/file/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization,
        },
      });
      setNewPhoto(response.data.fileId);
      setFormData((prevFormData) => ({
        ...prevFormData,
        photo: response.data.fileId,
      }));
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Error uploading photo");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData };
    if (newPhoto) {
      updatedFormData.photo = newPhoto;
    }

    try {
      const Authorization = localStorage.getItem("token");
      if (selectedContact) {
        const response = await axios.put(
          `${URL}/api/contactus/${selectedContact._id}`,
          updatedFormData,
          {
            headers: { Authorization },
          }
        );
        setContacts(
          contacts.map((contact) =>
            contact._id === selectedContact._id ? response.data : contact
          )
        );
        setSelectedContact(null);
        alert("Contact updated successfully");
      } else {
        const response = await axios.post(
          `${URL}/api/contactus/create`,
          updatedFormData,
          {
            headers: { Authorization },
          }
        );
        setContacts([...contacts, response.data]);
        alert("Contact created successfully");
      }
      setFormData({
        fullname: "",
        phone: "",
        email: "",
        designation: "",
        photo: "",
      });
      setNewPhoto(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Error ${selectedContact ? "updating" : "creating"} contact`);
    }
  };

  return (
    <div className="admin-contacts-container p-10 text-black">
      <h1 className="text-3xl font-bold mb-5 text-center">Manage Contacts</h1>
      <div className="contacts-list mb-5">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="contact-item bg-gray-200 p-4 mb-4 rounded flex justify-between items-center"
          >
            <div>
              <p>Name: {contact.fullname}</p>
              <p>Phone: {contact.phone}</p>
              <p>Email: {contact.email}</p>
              <p>Designation: {contact.designation}</p>
              {contact.photo && (
                <img
                  src={`${URL}/api/file/view/${contact.photo}`}
                  alt="Contact"
                  className="w-16 h-16 rounded-full"
                />
              )}
            </div>
            <div>
              <button
                className="bg-blue-600 p-2 rounded text-white mr-2"
                onClick={() => handleUpdate(contact)}
              >
                Update
              </button>
              <button
                className="bg-red-600 p-2 rounded text-white"
                onClick={() => handleDelete(contact._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-form bg-gray-200 p-5 rounded">
        <h2 className="text-2xl mb-4">
          {selectedContact ? "Update Contact" : "Create Contact"}
        </h2>
        <form onSubmit={handleSubmit} className="text-black">
          <label>
            Full Name:
            <input
              type="text"
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>
          <label>
            Designation:
            <input
              type="text"
              value={formData.designation}
              onChange={(e) =>
                setFormData({ ...formData, designation: e.target.value })
              }
              required
            />
          </label>
          <label>
            Photo:
            <input
              type="text"
              value={formData.photo}
              onChange={(e) =>
                setFormData({ ...formData, photo: e.target.value })
              }
            />
            {formData.photo && (
              <img
                src={`${URL}/api/file/view/${formData.photo}`}
                alt="Current"
                className="w-16 h-16 rounded-full"
              />
            )}
          </label>
          <label>
            New Photo:
            <input type="file" onChange={handlePhotoUpload} />
          </label>
          {newPhoto && (
            <img
              src={`${URL}/api/file/view/${newPhoto}`}
              alt="New"
              className="w-16 h-16 rounded-full"
            />
          )}
          <button
            type="submit"
            className="bg-blue-600 p-2 rounded text-white mt-4"
          >
            {selectedContact ? "Update Contact" : "Create Contact"}
          </button>
        </form>
      </div>

      <h1 className="text-3xl font-bold mb-5 text-center">Manage Messages</h1>
      <div className="contacts-list mb-5">
        {messages &&
          messages.map((message) => (
            <div
              key={message._id}
              className="contact-item bg-gray-200 p-4 mb-4 rounded shadow-md flex justify-between items-start"
            >
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-600">
                    {message.formattedDate}
                  </p>
                  <button
                    className="bg-red-600 p-1 rounded text-white text-xs"
                    onClick={() => handleMessageDelete(message._id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">{message.email}</p>
                  <p className="text-sm">{message.phone}</p>
                </div>
                <p className="mt-2 text-lg text-gray-800">{message.message}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Contact;
