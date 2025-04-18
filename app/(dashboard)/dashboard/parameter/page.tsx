import CreateParameter from '@/app/(dashboard)/dashboard/parameter/CreateParameter'
import CreateProportion from '@/app/(dashboard)/dashboard/parameter/CreateProportion'
import UpdateProportion from './UpdateProportion'

export default function Page() {
	return (
		<div className={'flex flex-col gap-y-2'}>
			<CreateProportion />
			<UpdateProportion />
			<CreateParameter />
		</div>
	)
}
