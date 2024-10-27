'use client'

import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";

export default function useCurrentUser(): { userId: number; cartId: number } | null {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
        const { cartId, userId } = jwtDecode<{ userId: number; cartId: number }>(accessToken);
        return { userId, cartId };
    }

    return null;
}