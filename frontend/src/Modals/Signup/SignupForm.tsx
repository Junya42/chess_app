import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons';


export default function SignupForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve()
      }, 3000)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Input
          mt={4}
          id='username'
          placeholder='Username'
          {...register('username', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <Input
          mt={4}
          id='email'
          type='email'
          placeholder='E-mail Address'
          {...register('email', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <Input
          mt={4}
          id='password'
          type='password'
          placeholder='Password'
          {...register('password', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
      </FormControl>
      <Button mt={8} colorScheme='teal' isLoading={isSubmitting} rightIcon={<ArrowForwardIcon />} type='submit'>
        Submit
      </Button>
    </form>
  )
}