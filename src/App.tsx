import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineInbox } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { RiBarChartBoxLine } from "react-icons/ri";
import { RiBoxingLine } from "react-icons/ri";
import { SiDropbox } from "react-icons/si";
import { TbAlignBoxCenterMiddle } from "react-icons/tb";
import { TbMessage2 } from "react-icons/tb";
import { TbMessageCircleUp } from "react-icons/tb";
import { TbMessage2Plus } from "react-icons/tb";
import { RiUserSettingsLine } from "react-icons/ri";
import { GrUserAdd } from "react-icons/gr";
import { GrUserExpert } from "react-icons/gr";
import TableComponent from "@lib/components/rbc-base/DataTable/oldindex";
import { useEffect, useState } from "react";
import TableAdapter from "@lib/components/rbc-utils/STA/TableAdaprot";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserDetails {
  id: number;
  address: string;
  phone: string;
  joinDate: string;
}

const Index = () => {
  const [data, setData] = useState<User[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setData([
      {
        id: 1,
        name: "ali",
        email: "/",
      },
      {
        id: 1,
        name: "ali",
        email: "/",
      },
      {
        id: 1,
        name: "ali",
        email: "/",
      },
      {
        id: 1,
        name: "ali",
        email: "/",
      },
      {
        id: 1,
        name: "ali",
        email: "/",
      },
      {
        id: 1,
        name: "ali",
        email: "/",
      },
      {
        id: 1,
        name: "ali",
        email: "/",
      },
      {
        id: 1,
        name: "ali",
        email: "/",
      },
      {
        id: 1,
        name: "ali",
        email: "/",
      },
      {
        id: 1,
        name: "ali",
        email: "/",
      },
      {
        id: 1,
        name: "ali",
        email: "/",
      },
      {
        id: 1,
        name: "ali",
        email: "/",
      },
      {
        id: 1,
        name: "ali",
        email: "/",
      },
      {
        id: 1,
        name: "ali",
        email: "/",
      },
      {
        id: 1,
        name: "ali",
        email: "/",
      },
    ]);
  }, []);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    setData([
      {
        id: 1,
        name: "ali",
        email: "/",
      },
      {
        id: 1,
        name: "ali",
        email: "/",
      },
    ]);
    // try {
    //   const response = await fetch(`/api/users?page=${page}&limit=20`);
    //   const data: any = await response.json();

    //   setData(data.results);
    //   setTotalItems(data.count);
    // } catch (error) {
    //   console.error('Error fetching users:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const fetchUserDetails = async (user: User) => {
    // const response = await fetch(`/api/users/${user.id}/details`);
    // const details: UserDetails = await response.json();
    const details = {
      address: "some address",
      phone: "09322",
      joinDate: "1-1-1-1",
    };
    return (
      <div className="rbc-space-y-4">
        <h3 className="rbc-text-lg rbc-font-medium">جزئیات کاربر</h3>
        <div className="rbc-grid rbc-grid-cols-2 rbc-gap-4">
          <div>
            <p className="rbc-text-sm rbc-text-gray-500">آدرس</p>
            <p className="rbc-text-sm">{details.address}</p>
          </div>
          <div>
            <p className="rbc-text-sm rbc-text-gray-500">تلفن</p>
            <p className="rbc-text-sm">{details.phone}</p>
          </div>
          <div>
            <p className="rbc-text-sm rbc-text-gray-500">تاریخ عضویت</p>
            <p className="rbc-text-sm">{details.joinDate}</p>
          </div>
        </div>
      </div>
    );
  };

  const columns = [
    { key: "name", header: "نام", sortable: true },
    { key: "email", header: "ایمیل", sortable: true },
  ];

  return (
    <>
      {/* <TableComponent
        data={data}
        columns={columns}
        renderActionMenu={(row) => {
          return (
            <button
              onClick={() => console.log(row)}
              className="rbc-p-2 rbc-text-blue-500 rbc-bg-blue-50 rbc-rounded"
            >
              {" "}
              view detail
            </button>
          );
        }}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        loading={loading}
        expandableContent={fetchUserDetails}
        onAddNew={() => setShowAddModal(true)}
        addNewButtonLabel="افزودن کاربر جدید"
      /> */}

      {/* Add your modal component here */}
    </>
  );
};

export default Index;
