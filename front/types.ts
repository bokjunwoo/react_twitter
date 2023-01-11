import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export interface SetIsLoginProps {
  setIsLogin: Dispatch<SetStateAction<boolean>>
}

export interface DataTypes {
  header: string,
  data: {nickName :string}[]
}

export type InputType = [
  string, (e: ChangeEvent<HTMLInputElement>) => void
]