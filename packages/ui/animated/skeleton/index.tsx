'use client'
import type { SkeletonProps } from 'react-loading-skeleton'
import S from 'react-loading-skeleton'

export const Skeleton = ({ ...props }: SkeletonProps) => {
  return <S {...props} />
}
