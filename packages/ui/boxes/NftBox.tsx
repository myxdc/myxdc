import { Skeleton } from '../animated'
import { Typography } from '../typography'

interface NftBoxProps {
  name?: string
  description?: string
  owner?: string
  image?: string
}

export const NftBox = ({ name, description, owner, image }: NftBoxProps) => {
  return (
    <div className="max-w-sm mx-auto ">
      <div className="flex items-center w-full overflow-hidden border border-gray-200 shadow-xl rounded-3xl aspect-square bg-primary-100">
        {image ? (
          <img src={image} alt={name} className="object-cover w-full h-full rounded-3xl" />
        ) : (
          <Skeleton height={500} width={500} />
        )}
      </div>
      <div className="p-6 mt-6 bg-white shadow-xl rounded-3xl">
        <Typography variant="h3" weight={600} as="h1" className="text-primary-600">
          {name || <Skeleton height={60} />}
        </Typography>
        <Typography variant="p" className="mt-3">
          {description || <Skeleton height={60} />}
        </Typography>
        <Typography variant="p" className="mt-3 text-black" weight={600}>
          Owner:
        </Typography>
        <Typography variant="p" className="break-words">
          {owner || <Skeleton />}
        </Typography>
      </div>
    </div>
  )
}
