"use client";
import { useQuery } from "@tanstack/react-query"
import { supabase } from './supabase'
import React from "react";

const initUser = {
	id: "",
    email: "",
	profileImage: "",
};

export default function useUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const { data, error } = await supabase.auth.getSession();
            if(data.session?.user){
                // fetch user information
                const { data: user } = await fetch(`/api/users/${data.session?.user.id}`).then((res) => res.json());

                return user;
            }
            return initUser;
        },
    });
}