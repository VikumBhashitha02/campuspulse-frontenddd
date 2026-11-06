import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Layers,
  Plus,
  Search,
  Building2,
  GraduationCap,
  Users,
  Edit,
  Trash2,
  MoreVertical,
  Eye,
  RefreshCw,
  X,
  BookOpen,
  Calendar,
  AlertTriangle,
  Building,
} from "lucide-react";
import { toast } from "sonner";
import { adminApi, type DepartmentItem } from "@/lib/api/admin";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { EmptyState, ErrorState, RowSkeleton } from "@/components/common/States";

interface AdminDepartmentsProps {
  initialFacultyId?: string;
  initialUniversityId?: string;
}

export function AdminDepartments({ initialFacultyId, initialUniversityId }: AdminDepartmentsProps) {
  const queryClient = useQueryClient();

  // Filters & State
  const [searchTerm, setSearchTerm] = useState("");
  const [universityFilter, setUniversityFilter] = useState<string>(initialUniversityId || "all");
  const [facultyFilter, setFacultyFilter] = useState<string>(initialFacultyId || "all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const limit = 24;

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalDept, setEditModalDept] = useState<DepartmentItem | null>(null);
  const [detailModalId, setDetailModalId] = useState<string | null>(null);
  const [deleteConfirmDept, setDeleteConfirmDept] = useState<DepartmentItem | null>(null);

  // Create Form State
  const [createForm, setCreateForm] = useState({
    universityId: initialUniversityId || "",
    facultyId: initialFacultyId || "",
    name: "",
    code: "",
    slug: "",
    description: "",
  });

  // Edit Form State
  const [editForm, setEditForm] = useState({
    facultyId: "",
    name: "",
    code: "",
    slug: "",
    description: "",
  });

  // Queries
  const departmentsQuery = useQuery({
    queryKey: [
      "admin",
      "departments",
      {
        search: searchTerm || undefined,
        facultyId: facultyFilter === "all" ? undefined : facultyFilter,
        universityId: universityFilter === "all" ? undefined : universityFilter,
        sortBy,
        sortOrder,
        page,
        limit,
      },
    ],
    queryFn: () =>
      adminApi.getDepartments({
        search: searchTerm || undefined,
        facultyId: facultyFilter === "all" ? undefined : facultyFilter,
        universityId: universityFilter === "all" ? undefined : universityFilter,
        sortBy,
        sortOrder,
        page,
        limit,
      }),
  });

  const universitiesQuery = useQuery({
    queryKey: ["admin", "universities", { limit: 100 }],
    queryFn: () => adminApi.getUniversities({ limit: 100 }),
  });

  const facultiesQuery = useQuery({
    queryKey: ["admin", "faculties", { limit: 200 }],
    queryFn: () => adminApi.getFaculties({ limit: 200 }),
  });

  const detailQuery = useQuery({
    queryKey: ["admin", "department-detail", detailModalId],
    queryFn: () => (detailModalId ? adminApi.getDepartmentDetails(detailModalId) : null),
    enabled: !!detailModalId,
  });

  const departments = departmentsQuery.data?.data || [];
  const totalRecords = departmentsQuery.data?.total || 0;
  const totalPages = departmentsQuery.data?.totalPages || 1;
  const universities = universitiesQuery.data?.data || [];
  const allFaculties = facultiesQuery.data?.data || [];

  // Cascading faculties for filter bar
  const filterAvailableFaculties = useMemo(() => {
    if (universityFilter === "all") return allFaculties;
    return allFaculties.filter((f) => f.universityId === universityFilter);
  }, [allFaculties, universityFilter]);

  // Cascading faculties for create modal
  const createAvailableFaculties = useMemo(() => {
    if (!createForm.universityId) return allFaculties;
    return allFaculties.filter((f) => f.universityId === createForm.universityId);
  }, [allFaculties, createForm.universityId]);

  const invalidateQueries = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin", "departments"] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "faculties"] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "universities"] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "overview-stats"] });
    if (detailModalId) {
      void queryClient.invalidateQueries({ queryKey: ["admin", "department-detail", detailModalId] });
    }
  };

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data: typeof createForm) =>
      adminApi.createDepartment({
        facultyId: data.facultyId,
        name: data.name,
        code: data.code,
        slug: data.slug,
        description: data.description,
      }),
    onSuccess: (res) => {
      toast.success(`Department "${res.name}" created successfully!`);
      setCreateModalOpen(false);
      setCreateForm({
        universityId: "",
        facultyId: "",
        name: "",
        code: "",
        slug: "",
        description: "",
      });
      invalidateQueries();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to create department");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: typeof editForm }) => adminApi.updateDepartment(id, data),
    onSuccess: (res) => {
      toast.success(`Department "${res.name}" updated successfully!`);
      setEditModalDept(null);
      invalidateQueries();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update department");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteDepartment(id),
    onSuccess: (res) => {
      toast.success(res.message || "Department deleted successfully.");
      setDeleteConfirmDept(null);
      if (detailModalId) setDetailModalId(null);
      invalidateQueries();
    },
    onError: (err: any) => {
      toast.error(err.message || "Cannot delete department");
    },
  });

  // Auto-generate code and slug on name change
  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const code = name
      .split(/\s+/)
      .filter((w) => !["of", "and", "the", "for", "in"].includes(w.toLowerCase()))
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 8);

    setCreateForm((prev) => ({
      ...prev,
      name,
      slug: prev.slug === "" || prev.slug === name.toLowerCase().replace(/\s+/g, "-").slice(0, -1) ? slug : prev.slug,
      code: prev.code === "" ? (code ? `D${code}` : "DCS") : prev.code,
    }));
  };

  const handleOpenEdit = (dept: DepartmentItem) => {
    setEditForm({
      facultyId: dept.facultyId,
      name: dept.name,
      code: dept.code,
      slug: dept.slug,
      description: dept.description || "",
    });
    setEditModalDept(dept);
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* KPI METRICS */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Departments
            </span>
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Layers className="size-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-foreground">{totalRecords}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Academic programs</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Parent Faculties</span>
            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
              <GraduationCap className="size-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-foreground">{allFaculties.length}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Divisions hosting departments</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Partner Campuses</span>
            <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400">
              <Building2 className="size-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-foreground">{universities.length}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Higher education institutions</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Enrolled Students</span>
            <div className="rounded-lg bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400">
              <Users className="size-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-foreground">
            {departments.reduce((acc, d) => acc + (d._count?.studentProfiles || 0), 0)}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">Affiliated student profiles</p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FILTER & TOOLBAR */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Search departments by name, code, faculty, university..."
              className="h-9 pl-9 text-xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* University Filter */}
          <select
            value={universityFilter}
            onChange={(e) => {
              setUniversityFilter(e.target.value);
              setFacultyFilter("all");
              setPage(1);
            }}
            className="h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Universities</option>
            {universities.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.code})
              </option>
            ))}
          </select>

          {/* Faculty Filter (Cascading) */}
          <select
            value={facultyFilter}
            onChange={(e) => {
              setFacultyFilter(e.target.value);
              setPage(1);
            }}
            className="h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Faculties</option>
            {filterAvailableFaculties.map((f) => (
              <option key={f.id} value={f.id}>
                {f.university.code} — {f.name} ({f.code})
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={`${sortBy}:${sortOrder}`}
            onChange={(e) => {
              const [field = "name", order = "asc"] = e.target.value.split(":");
              setSortBy(field);
              setSortOrder((order as "asc" | "desc") || "asc");
            }}
            className="h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="name:asc">Name (A-Z)</option>
            <option value="name:desc">Name (Z-A)</option>
            <option value="code:asc">Code (A-Z)</option>
            <option value="createdAt:desc">Newest First</option>
            <option value="studentProfiles:desc">Most Students</option>
          </select>

          {(searchTerm || universityFilter !== "all" || facultyFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setUniversityFilter("all");
                setFacultyFilter("all");
                setPage(1);
              }}
              className="h-9 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="mr-1 size-3.5" /> Reset
            </Button>
          )}
        </div>

        <Button size="sm" onClick={() => setCreateModalOpen(true)} className="h-9 text-xs shadow-sm">
          <Plus className="mr-1.5 size-4" /> Add Department
        </Button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* DEPARTMENTS GRID / LIST */}
      {/* ------------------------------------------------------------- */}
      {departmentsQuery.isPending ? (
        <RowSkeleton />
      ) : departmentsQuery.isError ? (
        <ErrorState onRetry={() => departmentsQuery.refetch()} />
      ) : departments.length === 0 ? (
        <EmptyState
          title="No departments found"
          description={
            searchTerm || universityFilter !== "all" || facultyFilter !== "all"
              ? "Try adjusting your search criteria or resetting filters."
              : "No academic departments registered in the database yet. Click 'Add Department' to create one."
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => {
            const studentsCount = d._count?.studentProfiles ?? 0;
            const eventsCount = d._count?.events ?? 0;

            return (
              <div
                key={d.id}
                className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
                          {d.code}
                        </span>
                        <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {d.faculty?.university?.code || "CAMPUS"}
                        </span>
                      </div>

                      <h3 className="mt-1.5 text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {d.name}
                      </h3>

                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <GraduationCap className="size-3 text-muted-foreground/80 shrink-0" />
                        <span>{d.faculty?.name}</span>
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-foreground">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="text-xs">Department Options</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setDetailModalId(d.id)} className="text-xs cursor-pointer">
                          <Eye className="mr-2 size-3.5 text-primary" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenEdit(d)} className="text-xs cursor-pointer">
                          <Edit className="mr-2 size-3.5 text-blue-500" /> Edit Department
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteConfirmDept(d)}
                          className="text-xs text-rose-600 dark:text-rose-400 cursor-pointer"
                        >
                          <Trash2 className="mr-2 size-3.5" /> Delete Department
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {d.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {d.description}
                    </p>
                  )}

                  {/* University & Faculty Hierarchy Pill */}
                  <div className="rounded-lg bg-muted/40 p-2.5 border border-border/40 text-[11px] text-muted-foreground space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">{d.faculty?.university?.name}</span>
                      <span className="font-mono text-[10px] text-primary">{d.faculty?.code}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-border/50 pt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="size-3 text-muted-foreground/80" />
                    <strong className="text-foreground font-semibold">{studentsCount}</strong> Students
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs px-2.5"
                    onClick={() => setDetailModalId(d.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PAGINATION */}
      {/* ------------------------------------------------------------- */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            Showing <strong className="text-foreground">{departments.length}</strong> of{" "}
            <strong className="text-foreground">{totalRecords}</strong> departments
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-8 text-xs"
            >
              Previous
            </Button>
            <span className="text-xs font-medium text-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="h-8 text-xs"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 1: CREATE DEPARTMENT */}
      {/* ------------------------------------------------------------- */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Layers className="size-5 text-primary" /> Add Academic Department
            </DialogTitle>
            <DialogDescription className="text-xs">
              Establish a department under an academic faculty division.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!createForm.facultyId || !createForm.name || !createForm.code) {
                toast.error("Please select a faculty and enter department name & code.");
                return;
              }
              createMutation.mutate(createForm);
            }}
            className="space-y-4 py-2"
          >
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Filter by University (Optional)</Label>
              <select
                value={createForm.universityId}
                onChange={(e) => {
                  setCreateForm({ ...createForm, universityId: e.target.value, facultyId: "" });
                }}
                className="w-full h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All Universities</option>
                {universities.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                Parent Faculty <span className="text-rose-500">*</span>
              </Label>
              <select
                required
                value={createForm.facultyId}
                onChange={(e) => setCreateForm({ ...createForm, facultyId: e.target.value })}
                className="w-full h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select Faculty...</option>
                {createAvailableFaculties.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.university.code} — {f.name} ({f.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                Department Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                required
                value={createForm.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Department of Computer Science"
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Department Code <span className="text-rose-500">*</span>
                </Label>
                <Input
                  required
                  value={createForm.code}
                  onChange={(e) => setCreateForm({ ...createForm, code: e.target.value.toUpperCase().trim() })}
                  placeholder="e.g. DCS"
                  className="font-mono text-xs uppercase"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  URL Slug <span className="text-rose-500">*</span>
                </Label>
                <Input
                  required
                  value={createForm.slug}
                  onChange={(e) => setCreateForm({ ...createForm, slug: e.target.value.toLowerCase().trim() })}
                  placeholder="e.g. computer-science"
                  className="font-mono text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Description (Optional)</Label>
              <Textarea
                rows={2}
                value={createForm.description}
                onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                placeholder="Course tracks, laboratory facilities, or department overview..."
                className="text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creating..." : "Create Department"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 2: EDIT DEPARTMENT */}
      {/* ------------------------------------------------------------- */}
      <Dialog open={!!editModalDept} onOpenChange={(open) => !open && setEditModalDept(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Edit className="size-5 text-primary" /> Edit Department
            </DialogTitle>
            <DialogDescription className="text-xs">
              Modify department details, code, slug, or parent faculty assignment.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!editModalDept) return;
              updateMutation.mutate({ id: editModalDept.id, data: editForm });
            }}
            className="space-y-4 py-2"
          >
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Parent Faculty</Label>
              <select
                value={editForm.facultyId}
                onChange={(e) => setEditForm({ ...editForm, facultyId: e.target.value })}
                className="w-full h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {allFaculties.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.university.code} — {f.name} ({f.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Department Name</Label>
              <Input
                required
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Department Code</Label>
                <Input
                  required
                  value={editForm.code}
                  onChange={(e) => setEditForm({ ...editForm, code: e.target.value.toUpperCase().trim() })}
                  className="font-mono text-xs uppercase"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">URL Slug</Label>
                <Input
                  required
                  value={editForm.slug}
                  onChange={(e) => setEditForm({ ...editForm, slug: e.target.value.toLowerCase().trim() })}
                  className="font-mono text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Description</Label>
              <Textarea
                rows={2}
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setEditModalDept(null)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 3: VIEW DETAILS */}
      {/* ------------------------------------------------------------- */}
      <Dialog open={!!detailModalId} onOpenChange={(open) => !open && setDetailModalId(null)}>
        <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
          {detailQuery.isPending ? (
            <RowSkeleton />
          ) : detailQuery.isError || !detailQuery.data ? (
            <ErrorState onRetry={() => detailQuery.refetch()} />
          ) : (
            (() => {
              const d = detailQuery.data.department;
              const audit = detailQuery.data.auditHistory || [];

              return (
                <div className="space-y-5">
                  <DialogHeader>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary">
                        {d.code}
                      </span>
                      <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {d.faculty?.university?.name}
                      </span>
                    </div>
                    <DialogTitle className="text-base font-bold text-foreground mt-1">{d.name}</DialogTitle>
                    <DialogDescription className="text-xs">
                      Faculty of {d.faculty?.name} • {d.faculty?.university?.city || "Sri Lanka"}
                    </DialogDescription>
                  </DialogHeader>

                  {d.description && (
                    <div className="rounded-lg bg-muted/30 p-3 border border-border/40 text-xs text-foreground">
                      {d.description}
                    </div>
                  )}

                  {/* Summary Counts */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-border bg-card p-3 text-center">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">Affiliated Students</span>
                      <p className="text-xl font-bold text-foreground mt-1">{d._count?.studentProfiles || 0}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-3 text-center">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">Associated Events</span>
                      <p className="text-xl font-bold text-foreground mt-1">{d._count?.events || 0}</p>
                    </div>
                  </div>

                  {/* Hierarchy Breadcrumb Box */}
                  <div className="rounded-xl border border-border bg-card p-3.5 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Academic Hierarchy
                    </span>
                    <div className="flex items-center gap-2 text-xs text-foreground flex-wrap">
                      <span className="font-semibold">{d.faculty?.university?.name}</span>
                      <span>→</span>
                      <span className="font-semibold">{d.faculty?.name}</span>
                      <span>→</span>
                      <span className="font-bold text-primary">{d.name}</span>
                    </div>
                  </div>

                  {/* Audit Logs */}
                  {audit.length > 0 && (
                    <div className="space-y-2 border-t border-border pt-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Recent Audit History
                      </h4>
                      <div className="space-y-1.5">
                        {audit.map((log: any) => (
                          <div
                            key={log.id}
                            className="flex items-center justify-between rounded-lg bg-muted/20 p-2 text-xs"
                          >
                            <span className="font-mono text-[10px] font-semibold text-primary">{log.action}</span>
                            <span className="text-[10px] text-muted-foreground">{formatDate(log.createdAt)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <DialogFooter className="pt-2">
                    <Button variant="outline" size="sm" onClick={() => setDetailModalId(null)}>
                      Close
                    </Button>
                  </DialogFooter>
                </div>
              );
            })()
          )}
        </DialogContent>
      </Dialog>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 4: DELETE CONFIRMATION */}
      {/* ------------------------------------------------------------- */}
      <Dialog open={!!deleteConfirmDept} onOpenChange={(open) => !open && setDeleteConfirmDept(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base text-rose-600">
              <Trash2 className="size-5" /> Delete Department
            </DialogTitle>
            <DialogDescription className="text-xs leading-relaxed">
              Are you sure you want to permanently delete <strong>{deleteConfirmDept?.name}</strong>?
              <br />
              <br />
              <strong>Safety Protection:</strong> If student academic profiles or historical event records are linked to
              this department, deletion will be safely rejected by the server.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-2">
            <Button variant="outline" size="sm" onClick={() => setDeleteConfirmDept(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={deleteMutation.isPending}
              onClick={() => {
                if (deleteConfirmDept) deleteMutation.mutate(deleteConfirmDept.id);
              }}
            >
              {deleteMutation.isPending ? "Deleting..." : "Permanently Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
