"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminSidebar from "../../components/AdminSidebar";
import ImageUpload from "../../components/ImageUpload";
import ProgressChart from "../../components/ProgressChart";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState("");
  const [editingTitle, setEditingTitle] = useState("");
  const [editProgress, setEditProgress] = useState(0);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCourses(data);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = async () => {
    if (!title.trim()) return;

    const { error } = await supabase
      .from("courses")
      .insert([
        {
          title,
          progress: 0,
          icon_name: "BookOpen",
          image_url: imageUrl,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setImageUrl("");
    fetchCourses();
  };

  const updateCourse = async () => {
    const { error } = await supabase
      .from("courses")
      .update({
        title: editingTitle,
        progress: editProgress,
      })
      .eq("id", editingId);

    if (error) {
      alert(error.message);
      return;
    }

    setEditingId("");
    setEditingTitle("");
    setEditProgress(0);

    fetchCourses();
  };

  const deleteCourse = async (id: string) => {
    const ok = confirm("Delete this course?");

    if (!ok) return;

    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchCourses();
  };

  const filteredCourses = courses.filter((course) =>
    course.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalCourses = courses.length;

  const averageProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce(
            (sum, course) => sum + course.progress,
            0
          ) / courses.length
        )
      : 0;

  const completedCourses = courses.filter(
    (course) => course.progress === 100
  ).length;

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 min-h-screen bg-slate-950 text-white p-8">
        <h1 className="text-5xl font-bold mb-8">
          Admin Dashboard
        </h1>

        {/* Analytics Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-cyan-500 p-6 rounded-2xl">
            <h2 className="text-lg">
              Total Courses
            </h2>

            <p className="text-4xl font-bold">
              {totalCourses}
            </p>
          </div>

          <div className="bg-green-500 p-6 rounded-2xl">
            <h2 className="text-lg">
              Average Progress
            </h2>

            <p className="text-4xl font-bold">
              {averageProgress}%
            </p>
          </div>

          <div className="bg-purple-500 p-6 rounded-2xl">
            <h2 className="text-lg">
              Completed Courses
            </h2>

            <p className="text-4xl font-bold">
              {completedCourses}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-8">
          <ProgressChart courses={courses} />
        </div>

        {/* Add Course */}
        <div className="bg-white/10 p-6 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Add New Course
          </h2>

          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full p-3 rounded-lg text-black mb-4"
          />

          <ImageUpload
            onUpload={(url) =>
              setImageUrl(url)
            }
          />

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-48 h-32 object-cover rounded-lg mt-4"
            />
          )}

          <button
            onClick={addCourse}
            className="bg-cyan-500 px-5 py-3 rounded-lg mt-4"
          >
            Add Course
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search Courses..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full max-w-md p-3 rounded-lg text-black mb-8"
        />

        {/* Course List */}
        <div className="grid gap-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white/10 p-5 rounded-2xl"
            >
              {course.image_url && (
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}

              {editingId === course.id ? (
                <div className="space-y-3">
                  <input
                    value={editingTitle}
                    onChange={(e) =>
                      setEditingTitle(
                        e.target.value
                      )
                    }
                    className="w-full p-3 rounded text-black"
                  />

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editProgress}
                    onChange={(e) =>
                      setEditProgress(
                        Number(e.target.value)
                      )
                    }
                    className="w-full p-3 rounded text-black"
                  />

                  <button
                    onClick={updateCourse}
                    className="bg-green-500 px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">
                      {course.title}
                    </h3>

                    <p>
                      Progress:
                      {" "}
                      {course.progress}%
                    </p>
                  </div>

                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(
                          course.id
                        );
                        setEditingTitle(
                          course.title
                        );
                        setEditProgress(
                          course.progress
                        );
                      }}
                      className="bg-yellow-500 px-4 py-2 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteCourse(course.id)
                      }
                      className="bg-red-500 px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}