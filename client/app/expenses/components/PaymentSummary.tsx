import { FiArrowRight } from 'react-icons/fi'
import { Checkbox } from '@/_components/ui'
import { useGetHouseInfo } from '@/_hooks'
import { UserDisplay } from './UserDisplay'
import { useUpdatePaymentsStatus } from '../hooks'
import { BalanceSummary } from '../types'

type PaymentSummaryProps = {
  balanceSummary: BalanceSummary[]
  userId: number
  year: number
  month: number
}

const PaymentSummary = ({
  balanceSummary,
  userId,
  year,
  month,
}: PaymentSummaryProps) => {
  const { onUpdate: updatePaymentsStatus, isPending } =
    useUpdatePaymentsStatus()

  const houseId = useGetHouseInfo().houseId

  const handleUpdatePaymentSummaryStatus = (
    payerId: number,
    payeeId: number,
    paidDate: null | string,
  ) => {
    const data = {
      year,
      month,
      buyerId: payeeId,
      payerId,
      isPaid: paidDate === null ? true : false,
      houseId,
    }
    updatePaymentsStatus(data)
  }

  return (
    <div className='w-full rounded-sm border-[1px] border-slate-400 bg-slate-100 px-4 py-4 md:w-2/3 md:px-8 md:py-4'>
      <div className='flex items-center justify-start border-b-4 border-double border-slate-300 pb-2 '>
        <p className='text-base font-bold  md:text-lg'>Payment Summary</p>
      </div>
      <div className='flex flex-col gap-4 pt-4'>
        {balanceSummary.map((payer) => (
          <div
            className='flex items-start justify-center gap-4 border-b-[1px] border-dotted border-slate-400 pb-2 last:border-0'
            key={payer.payerId}
          >
            <div className='flex min-w-[80px] items-center gap-2 md:min-w-[130px]'>
              <UserDisplay
                name={payer.payerName}
                icon={payer.payerIcon}
                size={28}
              />
            </div>
            <div className='flex items-center pt-1'>
              <FiArrowRight size={16} />
            </div>
            <div className='flex w-full flex-col gap-2'>
              {payer.payees.map((payee) => (
                <div
                  className='flex items-center justify-between gap-4'
                  key={payee.payeeId}
                >
                  <div className='flex items-start justify-center gap-4 '>
                    <Checkbox
                      className='h-6 w-6'
                      checked={payee.paidDate === null ? false : true}
                      disabled={
                        isPending ||
                        (payer.payerId !== userId && payee.payeeId !== userId)
                      }
                      onClick={() =>
                        handleUpdatePaymentSummaryStatus(
                          payer.payerId,
                          payee.payeeId,
                          payee.paidDate,
                        )
                      }
                    />
                    <UserDisplay
                      name={payee.payeeName}
                      icon={payee.payeeIcon}
                      size={28}
                    />
                  </div>

                  <span className='font-medium md:text-lg'>$ {payee.fee}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { PaymentSummary }
