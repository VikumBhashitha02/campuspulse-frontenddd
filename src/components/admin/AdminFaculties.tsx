import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GraduationCap,
  Plus,
  Search,
  Building2,
  Layers,
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
import { adminApi, type FacultyItem } from "@/lib/api/admin";
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

interface AdminFacultiesProps {
  onOpenCreateDepartment?: (facultyId?: string, universityId?: string) => void;
}

export function AdminFaculties({ onOpenCreateDepartment }: AdminFacultiesProps) {
  const queryClient = useQueryClient();

  // Filters & State
  const [searchTerm, setSearchTerm] = useState("");
  const [universityFilter, setUniversityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const limit = 24;

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalFaculty, setEditModalFaculty] = useState<FacultyItem | null>(null);
  const [detailModalId, setDetailModalId] = useState<string | null>(null);
  const [deleteConfirmFaculty, setDeleteConfirmFaculty] = useState<FacultyItem | null>(null);

  // Create Form State
  const [createForm, setCreateForm] = useState({
    universityId: "",
    name: "",
    code: "",
    slug: "",
    description: "",
  });

  // Edit Form State
  const [editForm, setEditForm] = useState({
    universityId: "",
    name: "",
    code: "",
    slug: "",
    description: "",
  });

  // Queries
  const facultiesQuery = useQuery({
    queryKey: [
      "admin",
      "faculties",
      {
        search: searchTerm || undefined,
        universityId: universityFilter === "all" ? undefined : universityFilter,
        sortBy,
        sortOrder,
        page,
        limit,
      },
    ],
    queryFn: () =>
      adminApi.getFaculties({
        search: searchTerm || undefined,
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

  const detailQuery = useQuery({
    queryKey: ["admin", "faculty-detail", detailModalId],
    queryFn: () => (detailModalId ? adminApi.getFacultyDetails(detailModalId) : null),
    enabled: !!detailModalId,
  });

  const faculties = facultiesQuery.data?.data || [];
  const totalRecords = facultiesQuery.data?.total || 0;
  const totalPages = facultiesQuery.data?.totalPages || 1;
  const universities = universitiesQuery.data?.data || [];

  const invalidateQueries = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin", "faculties"] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "departments"] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "universities"] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "overview-stats"] });
    if (detailModalId) {
      void queryClient.invalidateQueries({ queryKey: ["admin", "faculty-detail", detailModalId] });
    }
  };

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data: typeof createForm) => adminApi.createFaculty(data),
    onSuccess: (res) => {
      toast.success(`Faculty "${res.name}" created successfully!`);
      setCreateModalOpen(false);
      setCreateForm({
        universityId: "",
        name: "",
        code: "",
        slug: "",
        description: "",
      });
      invalidateQueries();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to create faculty");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: typeof editForm }) => adminApi.updateFaculty(id, data),
    onSuccess: (res) => {
      toast.success(`Faculty "${res.name}" updated successfully!`);
      setEditModalFaculty(null);
      invalidateQueries();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update faculty");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteFaculty(id),
    onSuccess: (res) => {
      toast.success(res.message || "Faculty deleted successfully.");
      setDeleteConfirmFaculty(null);
      if (detailModalId) setDetailModalId(null);
      invalidateQueries();
    },
    onError: (err: any) => {
      toast.error(err.message || "Cannot delete faculty");
    },
  });

  // Auto-fill slug and code on name change
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
      .slice(0, 6);

    setCreateForm((prev) => ({
      ...prev,
      name,
      slug: prev.slug === "" || prev.slug === name.toLowerCase().replace(/\s+/g, "-").slice(0, -1) ? slug : prev.slug,
      code: prev.code === "" ? (code ? `F${code}` : "FOE") : prev.code,
    }));
  };

  const handleOpenEdit = (faculty: FacultyItem) => {
    setEditForm({
      universityId: faculty.universityId,
      name: faculty.name,
      code: faculty.code,
      slug: faculty.slug,
      description: faculty.description || "",
    });
    setEditModalFaculty(faculty);
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* KPI METRIC CARDS */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Faculties</span>
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <GraduationCap className="size-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-foreground">{totalRecords}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Academic divisions</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Partner Campuses</span>
            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
              <Building2 className="size-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-foreground">{universities.length}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Institutions represented</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Departments</span>
            <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400">
              <Layers className="size-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-foreground">{facultiesQuery.data?.stats?.totalDepartments ?? 0}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Curricula & specializations</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Affiliated Students</span>
            <div className="rounded-lg bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400">
              <Users className="size-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-foreground">
            {faculties.reduce((acc, f) => acc + (f._count?.studentProfiles || 0), 0)}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">Enrolled student profiles</p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FILTER & TOOLBAR */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative min-w-[240px] flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Search faculties by name, code, university..."
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
            <option value="departments:desc">Most Departments</option>
          </select>

          {(searchTerm || universityFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setUniversityFilter("all");
                setPage(1);
              }}
              className="h-9 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="mr-1 size-3.5" /> Reset
            </Button>
          )}
        </div>

        <Button size="sm" onClick={() => setCreateModalOpen(true)} className="h-9 text-xs shadow-sm">
          <Plus className="mr-1.5 size-4" /> Add Faculty
        </Button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FACULTIES GRID / LIST */}
      {/* ------------------------------------------------------------- */}
      {facultiesQuery.isPending ? (
        <RowSkeleton />
      ) : facultiesQuery.isError ? (
        <ErrorState onRetry={() => facultiesQuery.refetch()} />
      ) : faculties.length === 0 ? (
        <EmptyState
          title="No faculties found"
          description={
            searchTerm || universityFilter !== "all"
              ? "Try adjusting your search criteria or resetting filters."
              : "No academic faculties registered in the database yet. Click 'Add Faculty' to create one."
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {faculties.map((f) => {
            const deptsCount = f.departments?.length ?? f._count?.departments ?? 0;
            const studentsCount = f._count?.studentProfiles ?? 0;

            return (
              <div
                key={f.id}
                className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
                          {f.code}
                        </span>
                        <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                          <Building className="size-3" /> {f.university.code}
                        </span>
                      </div>

                      <h3 className="mt-1.5 text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {f.name}
                      </h3>

                      <p className="text-xs text-muted-foreground">{f.university.name}</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-foreground">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="text-xs">Faculty Options</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setDetailModalId(f.id)} className="text-xs cursor-pointer">
                          <Eye className="mr-2 size-3.5 text-primary" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenEdit(f)} className="text-xs cursor-pointer">
                          <Edit className="mr-2 size-3.5 text-blue-500" /> Edit Faculty
                        </DropdownMenuItem>
                        {onOpenCreateDepartment && (
                          <DropdownMenuItem
                            onClick={() => onOpenCreateDepartment(f.id, f.universityId)}
                            className="text-xs cursor-pointer"
                          >
                            <Plus className="mr-2 size-3.5 text-emerald-500" /> Add Department
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteConfirmFaculty(f)}
                          className="text-xs text-rose-600 dark:text-rose-400 cursor-pointer"
                        >
                          <Trash2 className="mr-2 size-3.5" /> Delete Faculty
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {f.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {f.description}
                    </p>
                  )}

                  {/* Departments preview */}
                  <div className="rounded-lg bg-muted/40 p-2.5 border border-border/40 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                        <Layers className="size-3" /> Departments ({deptsCount})
                      </span>
                      {onOpenCreateDepartment && (
                        <button
                          onClick={() => onOpenCreateDepartment(f.id, f.universityId)}
                          className="text-[11px] font-semibold text-primary hover:underline"
                        >
                          + Add
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {deptsCount === 0 ? (
                        <span className="text-[11px] italic text-muted-foreground">No departments configured</span>
                      ) : (
                        (f.departments || []).slice(0, 4).map((d) => (
                          <span
                            key={d.id}
                            className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-foreground"
                          >
                            <BookOpen className="size-2.5 text-primary" /> {d.name}
                          </span>
                        ))
                      )}
                      {deptsCount > 4 && (
                        <span className="text-[10px] text-muted-foreground px-1 py-0.5">
                          +{deptsCount - 4} more
                        </span>
                      )}
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
                    onClick={() => setDetailModalId(f.id)}
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
            Showing <strong className="text-foreground">{faculties.length}</strong> of{" "}
            <strong className="text-foreground">{totalRecords}</strong> faculties
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
      {/* MODAL 1: CREATE FACULTY */}
      {/* ------------------------------------------------------------- */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <GraduationCap className="size-5 text-primary" /> Add Academic Faculty
            </DialogTitle>
            <DialogDescription className="text-xs">
              Establish a faculty branch within a parent partner university.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!createForm.universityId || !createForm.name || !createForm.code) {
                toast.error("Please fill in parent university, faculty name, and code.");
                return;
              }
              createMutation.mutate(createForm);
            }}
            className="space-y-4 py-2"
          >
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                Parent University <span className="text-rose-500">*</span>
              </Label>
              <select
                required
                value={createForm.universityId}
                onChange={(e) => setCreateForm({ ...createForm, universityId: e.target.value })}
                className="w-full h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select University...</option>
                {universities.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                Faculty Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                required
                value={createForm.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Faculty of Science"
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Faculty Code <span className="text-rose-500">*</span>
                </Label>
                <Input
                  required
                  value={createForm.code}
                  onChange={(e) => setCreateForm({ ...createForm, code: e.target.value.toUpperCase().trim() })}
                  placeholder="e.g. FOS"
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
                  placeholder="e.g. faculty-of-science"
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
                placeholder="Overview of disciplines, degree offerings, or research areas..."
                className="text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creating..." : "Create Faculty"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 2: EDIT FACULTY */}
      {/* ------------------------------------------------------------- */}
      <Dialog open={!!editModalFaculty} onOpenChange={(open) => !open && setEditModalFaculty(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Edit className="size-5 text-primary" /> Edit Faculty
            </DialogTitle>
            <DialogDescription className="text-xs">
              Modify faculty identification, code, or description.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!editModalFaculty) return;
              updateMutation.mutate({ id: editModalFaculty.id, data: editForm });
            }}
            className="space-y-4 py-2"
          >
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Parent University</Label>
              <select
                value={editForm.universityId}
                onChange={(e) => setEditForm({ ...editForm, universityId: e.target.value })}
                className="w-full h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {universities.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Faculty Name</Label>
              <Input
                required
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Faculty Code</Label>
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
              <Button type="button" variant="outline" size="sm" onClick={() => setEditModalFaculty(null)}>
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
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {detailQuery.isPending ? (
            <RowSkeleton />
          ) : detailQuery.isError || !detailQuery.data ? (
            <ErrorState onRetry={() => detailQuery.refetch()} />
          ) : (
            (() => {
              const f = detailQuery.data.faculty;
              const audit = detailQuery.data.auditHistory || [];

              return (
                <div className="space-y-5">
                  <DialogHeader>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary">
                        {f.code}
                      </span>
                      <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {f.university.name}
                      </span>
                    </div>
                    <DialogTitle className="text-base font-bold text-foreground mt-1">{f.name}</DialogTitle>
                    <DialogDescription className="text-xs">
                      Affiliated with {f.university.name} ({f.university.city || "Sri Lanka"}).
                    </DialogDescription>
                  </DialogHeader>

                  {f.description && (
                    <div className="rounded-lg bg-muted/30 p-3 border border-border/40 text-xs text-foreground">
                      {f.description}
                    </div>
                  )}

                  {/* Summary Counts */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-border bg-card p-3 text-center">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">Departments</span>
                      <p className="text-xl font-bold text-foreground mt-1">
                        {f.departments?.length || f._count?.departments || 0}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-3 text-center">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">Students</span>
                      <p className="text-xl font-bold text-foreground mt-1">{f._count?.studentProfiles || 0}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-3 text-center">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">Events</span>
                      <p className="text-xl font-bold text-foreground mt-1">{f._count?.events || 0}</p>
                    </div>
                  </div>

                  {/* Departments List */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Academic Departments ({f.departments?.length || 0})
                      </h4>
                      {onOpenCreateDepartment && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => {
                            setDetailModalId(null);
                            onOpenCreateDepartment(f.id, f.universityId);
                          }}
                        >
                          <Plus className="mr-1 size-3" /> Add Department
                        </Button>
                      )}
                    </div>

                    {!f.departments || f.departments.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                        No departments registered under this faculty.
                      </div>
                    ) : (
                      <div className="divide-y divide-border/50 rounded-xl border border-border bg-card">
                        {f.departments.map((d: any) => (
                          <div key={d.id} className="flex items-center justify-between p-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-primary">{d.code}</span>
                                <span className="font-bold text-xs text-foreground">{d.name}</span>
                              </div>
                              <p className="text-[11px] text-muted-foreground mt-0.5">
                                {d._count?.studentProfiles ?? 0} Student Profile(s)
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
      <Dialog open={!!deleteConfirmFaculty} onOpenChange={(open) => !open && setDeleteConfirmFaculty(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base text-rose-600">
              <Trash2 className="size-5" /> Delete Faculty
            </DialogTitle>
            <DialogDescription className="text-xs leading-relaxed">
              Are you sure you want to permanently delete <strong>{deleteConfirmFaculty?.name}</strong>?
              <br />
              <br />
              <strong>Safety Protection:</strong> If students are currently affiliated with this faculty or historical
              event records exist, deletion will be blocked by the server to protect data integrity.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-2">
            <Button variant="outline" size="sm" onClick={() => setDeleteConfirmFaculty(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={deleteMutation.isPending}
              onClick={() => {
                if (deleteConfirmFaculty) deleteMutation.mutate(deleteConfirmFaculty.id);
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
