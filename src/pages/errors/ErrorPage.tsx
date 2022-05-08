import Text from "../../components/ui/Text";

export default function ErrorPage({
  message = 'Something went wrong'
}: { message?: string }) {

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text size="x-large">{message}</Text>
    </div>
  )
}