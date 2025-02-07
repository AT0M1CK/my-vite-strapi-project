import React, { useState } from "react";
import { Button } from "./ui/button";
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

const AddNewReview: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      {/* Modal toggle button */}
      <Button
        onClick={toggleModal}
        className="my-3 mx-2 rounded-md"
        type="button"
      >
        Add Review
      </Button>

      {isModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={toggleModal} // Click on overlay closes the modal
          ></div>

          {/* Modal container */}
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                {/* Modal header */}
                <Progress value={33} />

                <div className="flex items-center justify-between p-2 md:p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Write new review
                  </h3>
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <IoCloseOutline size={24} />
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                {/* Modal body */}
                <form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-2 grid-cols-2">
                    <div className="col-span-2">
                      <div className="text-start space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          type="text"
                          placeholder="Enter your username..."
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 mb-2 grid-cols-2">
                    <div className="col-span-2">
                      <div className="text-start space-y-2">
                        <Label htmlFor="review">Review</Label>
                        <Textarea
                          className="h-32"
                          id="review"
                          placeholder="Write your review..."
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rating & Activate switch in one line */}
                  <div className="col-span-2 flex justify-between items-center mb-3">
                    {/* Rating Input */}
                    <div className="text-start space-y-2">
                      <Label htmlFor="rating">Rating</Label>
                      <Input
                        className="w-24"
                        id="rating"
                        type="number"
                        placeholder="0-10"
                        required
                        min="0"
                        max="10"
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          if (value < 0) e.target.value = "0";
                          if (value > 10) e.target.value = "10";
                        }}
                      />
                    </div>

                    {/* Activate Switch */}
                    <div className="flex items-center">
                      <Label htmlFor="active">Activate</Label>
                      <Switch className="ml-3" />
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button
                      type="submit"
                      className="text-white w-full inline-flex items-center font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      <HiOutlinePlusSm size={20} className="" />
                      Post Review
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddNewReview;
