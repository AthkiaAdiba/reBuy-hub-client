"use client";

import { TFetchedSubscribers } from "@/types/subscriber";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DeleteSubscribeModal from "./DeleteSubscribeModal";

const AllSubscribersTable = ({
  subscribers,
}: {
  subscribers: TFetchedSubscribers[];
}) => {
  const [subscriber, setSubscriber] = useState<TFetchedSubscribers | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSubscriber(null);
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#00175f] hover:bg-[#00175f]">
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Subscribed Date</TableHead>
              <TableHead className="text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers?.map((subscriber) => (
              <TableRow key={subscriber?._id}>
                <TableCell className="py-2 px-3 align-middle">
                  {subscriber?.userEmail}
                </TableCell>
                <TableCell className="py-2 px-3 align-middle">
                  {new Date(subscriber?.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="py-2 px-3 align-middle">
                  <div className="flex items-center justify-end gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setIsDeleteModalOpen(true);
                              setSubscriber(subscriber);
                            }}
                            className="hover:bg-[#00175f]/60 text-gray-500 dark:text-gray-300 hover:text-[#010527] transition-colors h-8 w-8"
                          >
                            <MdDelete className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Subscriber</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Subscriber Modal */}
      {isDeleteModalOpen && (
        <DeleteSubscribeModal
          subscriber={subscriber}
          handleCloseDeleteModal={handleCloseDeleteModal}
        />
      )}
    </div>
  );
};

export default AllSubscribersTable;
