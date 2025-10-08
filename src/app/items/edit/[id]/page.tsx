"use client";

import { use } from "react";
import EditItemPage from "@/features/items/pages/EditItemPage/EditItemPage";

type Props = {
    params: Promise<{ id: string }>;
};

export default function EditItemPageRoute({ params }: Props) {
    const { id } = use(params);

    return (
        <EditItemPage itemId={id}/>
    );
}