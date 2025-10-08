"use client";
import EditCategoryPage from "@/features/categories/pages/EditCategoryPage/EditCategoryPage";
import {use} from "react";

type Props = {
    params: Promise<{ id: string }>;
};

export default function EditCategoryPageRoute({ params }: Props) {
    const { id } = use(params);

    return (
        <EditCategoryPage categoryId={id}/>
    );
}