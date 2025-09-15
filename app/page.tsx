"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface PlayerStats {
  id: number;
  name: string;
  kills: string;
  blocks: string;
  digs: string;
  assists: string;
  aces: string;

}

const data = {
  players: [
    {
      id: 1,
      name: "Fatima Bryan",
      kills: "0",
      digs: "0",
      blocks: "0",
      aces: "0",
      assists: "0",

    },
    {
      id: 2,
      name: "Colleen Clark",
      kills: "0",
      digs: "0",
      blocks: "0",
      aces: "0",
      assists: "0",
    },
    {
      id: 3,
      name: "Merin Czerwiec",
      kills: "0",
      digs: "0",
      blocks: "0",
      aces: "0",
      assists: "0",
    },
    {
      id: 4,
      name: "Kathrine DeCaro",
      kills: "0",
      digs: "0",
      blocks: "0",
      aces: "0",
      assists: "0",
    },
    {
      id: 5,
      name: "Eija Hatcher",
      kills: "0",
      digs: "0",
      blocks: "0",
      aces: "0",
      assists: "0",
    },
    {
      id: 6,
      name: "Samantha Hess",
      kills: "0",
      digs: "0",
      blocks: "0",
      aces: "0",
      assists: "0",
    },
    {
      id: 7,
      name: "Mckayala Nergrown-Mautro",
      kills: "0",
      digs: "0",
      blocks: "0",
      aces: "0",
      assists: "0",
    },
    {
      id: 8,
      name: "Kayla Pecoy",
      kills: "0",
      digs: "0",
      blocks: "0",
      aces: "0",
      assists: "0",
    },
    {
      id: 9,
      name: "Caroline Tabb",
      kills: "0",
      digs: "0",
      blocks: "0",
      aces: "0",
      assists: "0",
    },
    {
      id: 10,
      name: "Paiyton Trombly",
      kills: "0",
      digs: "0",
      blocks: "0",
      aces: "0",
      assists: "0",
    },
    {
      id: 11,
      name: "Payton Verterame",
      kills: "0",
      digs: "0",
      blocks: "0",
      aces: "0",
      assists: "0",
    },
    {
      id: 12,
      name: "Lindsey Wiatrowski",
      kills: "0",
      digs: "0",
      blocks: "0",
      aces: "0",
      assists: "0",
    },
    {
      id: 13,
      name: "Mary Bajakian",
      kills: "0",
      digs: "0",
      blocks: "0",
      aces: "0",
      assists: "0",
    },
  ],
};

export default function Home() {
  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<PlayerStats | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    setPlayers(data.players);
  }, []);

  const handleEdit = (player: PlayerStats) => {
    setEditingId(player.id);
    setEditForm({ ...player });
  };

  const handleSave = () => {
    if (editForm) {
      setPlayers(
        players.map((player) => (player.id === editForm.id ? editForm : player))
      );
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof PlayerStats
  ) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: e.target.value });
    }
  };

  const handleSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedPlayers = [...players].sort((a, b) => {
      const aValue = a[key as keyof PlayerStats] || "0";
      const bValue = b[key as keyof PlayerStats] || "0";

      if (direction === "ascending") {
        return Number(aValue) - Number(bValue);
      } else {
        return Number(bValue) - Number(aValue);
      }
    });

    setPlayers(sortedPlayers);
  };

  // Function to generate and download PDF
  const downloadPDF = () => {
    // Create a printable version of the table
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Volleyball Player Statistics</title>
       <style>
  body { font-family: Arial, sans-serif; margin: 20px; }
  h1 { color: #dc2626; text-align: center; }  /* 🔴 changed */
  .subtitle { text-align: center; margin-bottom: 20px; }
  table { width: 100%; border-collapse: collapse; margin-top: 20px; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  th { background-color: #f3f4f6; color: #dc2626; } /* 🔴 changed */
  tr:nth-child(even) { background-color: #f9fafb; }
  .footer { margin-top: 30px; text-align: center; font-size: 0.8em; color: #6b7280; }
</style>

      </head>
      <body>
        <h1>Pope Volleyball Statsheet</h1>
        <div class="subtitle">Generated on ${new Date().toLocaleDateString()}</div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Kills</th>
              <th>Blocks</th>
              <th>Digs</th>
              <th>Assists</th>
              <th>Aces</th>
            </tr>
          </thead>
          <tbody>
            ${players
              .map(
                (player) => `
              <tr>
                <td>${player.name}</td>
                <td>${player.kills}</td>
                <td>${player.blocks}</td>
                <td>${player.digs}</td>
                <td>${player.assists}</td>
                <td>${player.aces}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <div class="footer">
          <p>Volleyball Stats Tracker - Generated by Coach Santino Giordano</p>
          <p>Contact Santinogiordano13@gmail.com</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();

      printWindow.onload = function () {
        printWindow.focus();
        printWindow.print();
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-5 bg-red-600 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              <Image
                src="/PFP_crest.webp"
                alt="crest"
                height={70}
                width={70}
                className="inline-block mr-2"
              />
              Pope Volleyball Statsheet
            </h1>
            <p className="mt-2">Track and manage player performance metrics</p>
          </div>
          <button
            onClick={downloadPDF}
            className="px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-indigo-50 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            Download PDF
          </button>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="min-w-full divide-y divide-gray-200" ref={tableRef}>
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("name")}
                >
                  Name{" "}
                  {sortConfig?.key === "name" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("kills")}
                >
                  Kills{" "}
                  {sortConfig?.key === "kills" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("blocks")}
                >
                  Blocks{" "}
                  {sortConfig?.key === "blocks" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("digs")}
                >
                  Digs{" "}
                  {sortConfig?.key === "digs" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("assists")}
                >
                  Assists{" "}
                  {sortConfig?.key === "assists" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("aces")}
                >
                  Aces{" "}
                  {sortConfig?.key === "aces" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {players.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  {editingId === player.id ? (
                    <>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {player.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <input
                          type="number"
                          className="w-16 p-1 border rounded"
                          value={editForm?.kills || ""}
                          onChange={(e) => handleChange(e, "kills")}
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <input
                          type="number"
                          className="w-16 p-1 border rounded"
                          value={editForm?.blocks || ""}
                          onChange={(e) => handleChange(e, "blocks")}
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <input
                          type="number"
                          className="w-16 p-1 border rounded"
                          value={editForm?.digs || ""}
                          onChange={(e) => handleChange(e, "digs")}
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <input
                          type="number"
                          className="w-16 p-1 border rounded"
                          value={editForm?.assists || ""}
                          onChange={(e) => handleChange(e, "assists")}
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <input
                          type="number"
                          className="w-16 p-1 border rounded"
                          value={editForm?.aces || ""}
                          onChange={(e) => handleChange(e, "aces")}
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={handleSave}
                          className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    // View mode
                    <>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {player.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {player.kills}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {player.blocks}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {player.digs}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {player.assists}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {player.aces}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleEdit(player)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {players.length} players
            </p>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  const sorted = [...players].sort((a, b) =>
                    a.name.localeCompare(b.name)
                  );
                  setPlayers(sorted);
                }}
              >
                Sort by Name
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  const sorted = [...players].sort(
                    (a, b) =>
                      Number(b.kills) +
                      Number(b.blocks) +
                      Number(b.aces) -
                      (Number(a.kills) + Number(a.blocks) + Number(a.aces))
                  );
                  setPlayers(sorted);
                }}
              >
                Sort by Impact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
