const index = ({holiday}) => {
  return (
    <>
      <p>Date: {holiday.date}</p>
      <p>Title: {holiday.title}</p>
      <p>Notes: {holiday.notes}</p>
      <p>Bunting: {holiday.bunting}</p>
    </>
  );
}

export const getStaticProps = async ({params}) => {
  const response = await fetch('https://gov.uk/bank-holidays.json')
  const holidaysJson = await response.json()

  const holiday = holidaysJson['england-and-wales']['events'].find((holiday) => holiday.date === params.date)

  return {
    props: {
      holiday: {
        date: holiday.date,
        bunting: holiday.bunting,
        notes: holiday.notes,
        title: holiday.title
      }
    }
  }
}

export const getStaticPaths = async () => {
  const response = await fetch('https://gov.uk/bank-holidays.json')
  const holidaysJson = await response.json()
  const paths = holidaysJson['england-and-wales']['events'].map(
    (holiday) => ({
      params: {
        date: holiday.date,
      }
    })
  )

  return {
    paths,
    fallback: false
  }
}

export default index;
