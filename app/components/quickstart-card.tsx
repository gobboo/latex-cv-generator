import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import UploadFile from "./upload-file"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const linkedInRegex = /^https?:\/\/(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9._%~-]+\/?$/i;
const githubRegex = /^https?:\/\/(?:www\.)?github\.com\/[A-Za-z0-9-]+\/?$/i;

const schema = z.object({
	file: z.file(),
	linkedin: z.url({ hostname: linkedInRegex }),
	github: z.url({ hostname: githubRegex })
})

type Schema = z.infer<typeof schema>

export function QuickStartCard() {
	const form = useForm<Schema>({
		resolver: zodResolver(schema),
		defaultValues: {
			linkedin: "",
			github: ""
		}
	})

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
					Lets create your CV
				</CardTitle>
        <CardDescription>
          Enter the details below, and we can get that CV made in no time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <UploadFile />
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" disabled>
          Create my CV
        </Button>
      </CardFooter>
    </Card>
  )
}
