"use client";
import { PlayerStats } from "@/utils/types";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState<PlayerStats[]>([]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Kills</th>
              <th>Blocks</th>
              <th>Digs</th>
              <th>Assists</th>
              <th>Aces</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(items) &&
              items.map((player: PlayerStats) => (
                <tr key={player.id}>
                  <th>1</th>
                  <td>g</td>
                  <td>f</td>
                  <td>c</td>
                  <td>c</td>
                  <td>c</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
