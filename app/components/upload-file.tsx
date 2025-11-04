import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";


export default function UploadFile() {
	return (
		<Field>
			<FieldLabel htmlFor="file">
				Existing Resume / CV
			</FieldLabel>

			<Input
				id="file"
				type="file"
				required
			/>
		</Field>
	)
}