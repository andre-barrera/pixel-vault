"use client";

import { useRequireAuth } from "@/src/hooks/useRequireAuth";

const { user, loading } = useRequireAuth();
