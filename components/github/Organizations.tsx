import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export function OrgnizationCard({org}: any) {
  return (
    <Card className="w-[350px] hover:bg-gray-800">
        <div className="flex items-center mt-3">
            <CardContent className="">
                <img src={org.avatar_url} alt="" className="w-[50px] h-[50px] object-contain rounded-full" />
            </CardContent>
            <CardHeader>
                <CardTitle className="">{org.login}</CardTitle>
                <CardDescription className="text-sm font-[family-name:var(--font-geist-mono)]">{org.description || 'No description'}</CardDescription>
            </CardHeader>
        </div>

        <CardFooter className="flex justify-between">
            <Button variant="outline">
                <Link href={org.url} className="text-sm font-[family-name:var(--font-geist-mono)]">Visit Org</Link>
            </Button>
        </CardFooter>
    </Card>
  )
}
