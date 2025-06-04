import React, { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button, Box } from "@mui/material";
import { DeleteIcon, EditIcon } from "../../../icons/icons";
import { DataGrid } from "@mui/x-data-grid";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/course/courseApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import DeleteCourseModal from "../../../utils/DeleteCourseModal";
import { useRouter } from "next/navigation";

type Props = {};

const AllCourses: FC<Props> = () => {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const { isLoading, data, error, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [
    deleteCourse,
    { isSuccess: deleteSuccess, isLoading: deleteLoading, error: deleteError },
  ] = useDeleteCourseMutation();

  // update course
  useEffect(() => {
    if (deleteSuccess) {
      refetch();
      toast.success("Course deleted");
      setOpen(false);
    }

    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError as any;
        toast.error(errorData.data.message);
        setOpen(false);
      }
    }
  }, [deleteSuccess, deleteError, refetch]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.2 },
    { field: "purchased", headerName: "Purchased", flex: 0.3 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    { field: "updated_at", headerName: "Last Updated", flex: 0.5 },
    {
      field: " ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => router.push(`/admin/edit-course/${params.row.id}`)}
            >
              <EditIcon fontSize="small" />
            </Button>
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
                setCourseId(params.row.id);
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

  // fetching courses
  if (data) {
    data.courses?.forEach((item: any) => {
      rows.push({
        id: item._id,
        title: item.name,
        purchased: item.purchase,
        ratings: item.ratings,
        created_at: format(item.createdAt),
        updated_at: format(item.updatedAt),
      });
    });
  }

  // error fetching courses
  if (error) {
    if ("data" in error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }

  // delete course
  const handleDeleteCourse = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  return (
    <div className={`mt-[8rem] pl-4 `}>
      {!isLoading && !deleteLoading && (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            width="100%"
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
              "& .MuiDataGrid-cell": { borderBottom: "none" },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeader ": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeader .MuiSvgIcon-root ": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1f2a40" : "#f2f0f0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
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

      {/* open delete course modal */}
      {open && !deleteLoading && (
        <DeleteCourseModal
          open={open}
          setOpen={setOpen}
          handleDelete={handleDeleteCourse}
        />
      )}

      {/* loading */}
      {isLoading && <Loader />}

      {/* delete loading */}
      {deleteLoading && <Loader />}
    </div>
  );
};

export default AllCourses;
