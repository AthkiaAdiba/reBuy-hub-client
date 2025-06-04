"use client";

import { TFetchedUser } from "@/types/user";
import Image from "next/image";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import ChangeRoleAndStatusModal from "./ChangeRoleAndStatusModal";
import DeleteUserModal from "./DeleteUserModal";

const UsersTable = ({ users }: { users: TFetchedUser[] }) => {
  const [changeUserStatusModalOpen, setChangeUserStatusModalOpen] =
    useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [user, setUser] = useState<TFetchedUser | null>(null);

  const handleCloseUserStatusModal = () => {
    setChangeUserStatusModalOpen(false);
    setUser(null);
  };

  const handleCloseDeleteUserModal = () => {
    setDeleteUserModalOpen(false);
    setUser(null);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-[#00175f] text-white">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "unBan"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-4">
                    <MdDeleteOutline
                      className="cursor-pointer hover:text-red-500  text-2xl transition-colors "
                      onClick={() => {
                        setDeleteUserModalOpen(true);
                        setUser(user);
                      }}
                    />
                    <FaPen
                      className="cursor-pointer hover:text-blue-500  text-xl transition-colors"
                      onClick={() => {
                        setChangeUserStatusModalOpen(true);
                        setUser(user);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Change status and role of a user */}
      {changeUserStatusModalOpen && (
        <ChangeRoleAndStatusModal
          user={user}
          handleCloseUserStatusModal={handleCloseUserStatusModal}
        />
      )}

      {/* Delete a user */}
      {deleteUserModalOpen && (
        <DeleteUserModal
          user={user}
          handleCloseDeleteUserModal={handleCloseDeleteUserModal}
        />
      )}
    </div>
  );
};

export default UsersTable;
