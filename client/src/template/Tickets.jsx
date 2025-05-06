import { useEffect, useState } from "react";
import { getAllTickets, markTicketAsPaid } from "../api/endpoints/tickets";
import { toast } from "react-toastify";
import PaginationRounded from "../components/molecule/PaginationRounded";

export default function Tickets() {
  const [ticketsData, setTicketsData] = useState([]);
  const [ticketsCount, setTicketsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [paidFilter, setPaidFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const itemsPerPage = 6;
  const pageCount = Math.ceil(ticketsCount / itemsPerPage);

  useEffect(() => {
    fetchTickets(1, search);
  }, []);

  const fetchTickets = async (
    page,
    searchQuery = "",
    paid = paidFilter,
    status = statusFilter
  ) => {
    try {
      const res = await getAllTickets({
        page,
        limit: itemsPerPage,
        search: searchQuery,
        paidFilter: paid,
        statusFilter: status,
      });
      setTicketsData(res.data.tickets || []);
      setTicketsCount(res.data.totalTickets || 0);
      setCurrentPage(res.data.currentPage || 1);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error fetching tickets");
    }
  };
  const handleMarkAsPaid = async (ticketId) => {
    try {
      await markTicketAsPaid(ticketId);
      toast.success("Ticket marked as paid");

      fetchTickets(currentPage);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to mark ticket as paid");
    }
  };

  const handlePagination = (event, value) => {
    setCurrentPage(value);
    fetchTickets(value, search);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTickets(1, search);
  };

  return (
    <div className="lg:col-span-3 w-full mx-auto lg:ml-6 space-y-6">
      <div className="bg-white p-6 rounded-lg divide-y border">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
          All Tickets
        </h2>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex justify-between items-center gap-2 w-full mb-6"
        >
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by user, email or event"
              className="border rounded px-4 py-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Search
            </button>
          </div>
          <div className="flex gap-2">
            <select
              value={paidFilter}
              onChange={(e) => {
                setPaidFilter(e.target.value);
                fetchTickets(1, search, e.target.value, statusFilter);
              }}
              className="border rounded px-4 py-2"
            >
              <option value="">All Payments</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                fetchTickets(1, search, paidFilter, e.target.value);
              }}
              className="border rounded px-4 py-2"
            >
              <option value="">All Status</option>
              <option value="used">Used</option>
              <option value="unused">Unused</option>
            </select>
          </div>
        </form>

        {/* Tickets Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Event</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">For</th>
                <th className="px-6 py-3">Used</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Paid</th>
              </tr>
            </thead>
            <tbody>
              {ticketsData.length > 0 ? (
                ticketsData.map((ticket) => (
                  <tr key={ticket._id} className="bg-white border-b">
                    <td className="px-6 py-4">{ticket.user?.name}</td>
                    <td className="px-6 py-4">{ticket.user?.phoneNumber}</td>
                    <td className="px-6 py-4">{ticket.event?.title}</td>
                    <td className="px-6 py-4">
                      {new Date(ticket.event?.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{ticket.event?.location}</td>
                    <td className="px-6 py-4">{ticket.status}</td>
                    <td className="px-6 py-4">{ticket.maxUses}</td>
                    <td className="px-6 py-4">{ticket.usedCount}</td>
                    <td className="px-6 py-4">
                      {Number(ticket.event.price) * Number(ticket.maxUses)}
                    </td>
                    <td className="px-6 py-4">
                      {ticket.paid ? (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                          Paid
                        </span>
                      ) : (
                        <button
                          onClick={() => handleMarkAsPaid(ticket._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full text-xs font-medium min-w-20"
                        >
                          Pay now
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No tickets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {ticketsData.length > 0 && (
          <div className="mx-auto mt-4">
            <PaginationRounded
              count={pageCount}
              page={currentPage}
              onChange={handlePagination}
            />
          </div>
        )}
      </div>
    </div>
  );
}
