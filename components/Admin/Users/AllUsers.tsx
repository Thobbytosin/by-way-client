import React, { FC, FormEvent, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button, Box } from "@mui/material";
import { DeleteIcon, EmailIcon } from "@/icons/icons";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import UpdateUserRole from "@/utils/UpdateUserRole";
import DeleteUserModal from "@/utils/DeleteUserModal";
import { useUserMutations, useUserQueries } from "@/hooks/api/user.api";

type Props = {
  isTeam?: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("admin");
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");

  const { allUsersDomainData } = useUserQueries({ type: "all-users" });
  const { allUsers } = allUsersDomainData;

  const { infoLoading, userInfo, userInfoSuccess } = useUserMutations();
  const { deleteUserPending, updateRolePending } = infoLoading;
  const { deleteUser, updateRole } = userInfo;
  const { deleteUserSuccess, updateRoleSuccess } = userInfoSuccess;

  // for update user role
  useEffect(() => {
    if (updateRoleSuccess) {
      setActive(false);
    } else {
      setActive(false);
    }
  }, [updateRoleSuccess]);

  // for deleting user account
  useEffect(() => {
    if (deleteUserSuccess) {
      setOpen(false);
    }
  }, [deleteUserSuccess]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    {
      field: "role",
      headerName: "Role",
      flex: 0.2,
    },
    { field: "courses", headerName: "Courses Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: " ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <EmailIcon fontSize="small" color="primary" />
            </a>
          </>
        );
      },
    },
    {
      field: "",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUserId(params.row.id);
              }}
            >
              <DeleteIcon fontSize="small" color="warning" />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  // fetching users
  if (isTeam) {
    const newData = allUsers?.filter((user: any) => user.role === "admin");
    if (newData) {
      newData.forEach((user: any) => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          courses: user.courses.length,
          created_at: format(user.createdAt),
        });
      });
    }
  } else {
    if (allUsers) {
      allUsers.forEach((user: any) => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          courses: user.courses.length,
          created_at: format(user.createdAt),
        });
      });
    }
  }

  // handle email change
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  // handle role change
  const handleRoleChange = (event: any) => {
    setRole(event.target.value);
  };

  // submit role change form
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const dataToSubmit = { email, role };
    updateRole(dataToSubmit);
  };

  // delete user
  const handleDeleteUser = () => {
    if (userId) {
      deleteUser({ userId });
    }
  };

  return (
    <div className={`mt-[8rem] pl-4 `}>
      {updateRolePending || deleteUserPending ? (
        <Loader />
      ) : (
        <Box m="20px">
          {isTeam && (
            <div className=" w-[90%] flex justify-start  ">
              <button
                onClick={() => setActive(!active)}
                className="text-md text-center bg-primary py-2 px-6 rounded-full font-medium text-white transition duration-300 hover:text-primary hover:border hover:bg-transparent hover:border-primary"
              >
                Add New Member
              </button>
            </div>
          )}
          <Box
            m="40px 0 0 0"
            minWidth="150%"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": { border: "none", outline: "none" },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
                "&[title='admin']": { color: "#22c55e" },
                "&[title='user']": { color: "#ef4444" },
              },

              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeader ": {
                backgroundColor:
                  theme === "dark"
                    ? isTeam
                      ? "#ff0000"
                      : "#009e60"
                    : isTeam
                    ? "#ff2400"
                    : "#4cbb17",

                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#fff",
              },
              "& .MuiDataGrid-columnHeader .MuiSvgIcon-root ": {
                color: theme === "dark" ? "#fff" : "#fff",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1f2a40" : "#f2f0f0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#fff",
                borderTop: "none",
                backgroundColor:
                  theme === "dark"
                    ? isTeam
                      ? "#ff0000"
                      : "#009e60"
                    : isTeam
                    ? "#ff2400"
                    : "#4cbb17",
              },
              "& .MuiDataGrid-footerContainer .MuiToolbar-root": {
                color: "#fff",
              },
              "& .MuiDataGrid-footerContainer .MuiToolbar-root svg": {
                color: "#fff",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
        </Box>
      )}

      {/* open update role modal */}
      {active && !updateRolePending && (
        <UpdateUserRole
          active={active}
          setActive={setActive}
          handleSubmit={handleSubmit}
          role={role}
          handleRoleChange={handleRoleChange}
          email={email}
          handleEmailChange={handleEmailChange}
          loading={updateRolePending}
        />
      )}

      {/* open delete user modal */}
      {open && !deleteUserPending && (
        <DeleteUserModal
          open={open}
          setOpen={setOpen}
          handleDelete={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default AllUsers;
