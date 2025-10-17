"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Plus, Filter, Edit, Trash2, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

import { todosApi } from "@/lib/api/todos";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { Todo, TodoQueryParams } from "@/types";

export default function TodosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "done" | "undone">(
    "all"
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  // Query parameters for filtering and pagination
  const queryParams: TodoQueryParams = {
    filters:
      statusFilter !== "all" ? { isDone: statusFilter === "done" } : undefined,
    searchFilters: searchTerm ? { item: searchTerm } : undefined,
    page: 1,
    rows: 50,
    orderKey: "createdAt",
    orderRule: "desc",
  };

  // Fetch todos
  const { data: todosResponse, isLoading } = useQuery({
    queryKey: ["todos", queryParams],
    queryFn: () => todosApi.getAll(queryParams),
  });

  // Create todo mutation
  const createMutation = useMutation({
    mutationFn: todosApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setNewTodoText("");
      setIsCreateDialogOpen(false);
      toast({
        title: "Todo created",
        description: "Your todo has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create todo.",
        variant: "destructive",
      });
    },
  });

  // Mark todo mutation
  const markMutation = useMutation({
    mutationFn: ({ id, action }: { id: string; action: "DONE" | "UNDONE" }) =>
      todosApi.mark(id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        title: "Todo updated",
        description: "Todo status has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update todo.",
        variant: "destructive",
      });
    },
  });

  // Delete todo mutation
  const deleteMutation = useMutation({
    mutationFn: todosApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        title: "Todo deleted",
        description: "Todo has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete todo.",
        variant: "destructive",
      });
    },
  });

  const handleCreateTodo = () => {
    if (newTodoText.trim()) {
      createMutation.mutate({ item: newTodoText.trim() });
    }
  };

  const handleMarkTodo = (todo: Todo) => {
    const action = todo.isDone ? "UNDONE" : "DONE";
    markMutation.mutate({ id: todo.id, action });
  };

  const handleDeleteTodo = (id: string) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteMutation.mutate(id);
    }
  };

  const todos = todosResponse?.entries || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              To Do
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Welcome back, {user?.firstName}!
            </p>
          </div>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Todo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new task</DialogTitle>
                <DialogDescription>
                  Create a new todo item for your list.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Enter your todo..."
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleCreateTodo()}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateTodo}
                    disabled={createMutation.isPending || !newTodoText.trim()}
                  >
                    {createMutation.isPending ? "Creating..." : "Add Todo"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter by Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("done")}>
                    Done
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("undone")}>
                    Undone
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Todos Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Todos</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : todos.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No todos found. Create your first todo!
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Todo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todos.map((todo) => (
                    <TableRow key={todo.id}>
                      <TableCell className="font-medium">
                        {user?.firstName} {user?.lastName}
                      </TableCell>
                      <TableCell>{todo.item}</TableCell>
                      <TableCell>
                        <Badge
                          variant={todo.isDone ? "default" : "secondary"}
                          className={
                            todo.isDone ? "bg-green-500" : "bg-red-500"
                          }
                        >
                          {todo.isDone ? "Success" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkTodo(todo)}
                            disabled={markMutation.isPending}
                          >
                            {todo.isDone ? (
                              <X className="h-4 w-4" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteTodo(todo.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Pagination info */}
        {todosResponse && (
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
            Showing {todos.length} of {todosResponse.totalData} todos
          </div>
        )}
      </div>
    </div>
  );
}
