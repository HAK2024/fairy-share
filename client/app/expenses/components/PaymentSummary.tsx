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
    <div className='w-full rounded-sm border-[1px] border-slate-400 bg-slate-100 px-3 py-4 md:px-8 md:py-4 lg:w-2/3'>
      <div className='flex items-center justify-start border-b-4 border-double border-slate-300 pb-2 '>
        <p className='text-base font-bold  md:text-lg'>Payment Summary</p>
      </div>
      <div className='flex flex-col gap-4 overflow-x-auto pt-4'>
        {balanceSummary.map((payer) => (
          <div
            className='flex items-center gap-3 border-b-[1px] border-dotted border-slate-400 pb-2 last:border-0 md:justify-between md:gap-6'
            key={payer.payerId}
          >
            <div className='flex flex-shrink-0 items-center justify-between gap-1 md:gap-2'>
              <div className='w-24 md:w-40'>
                <UserDisplay
                  name={payer.payerName}
                  icon={payer.payerIcon}
                  size={28}
                />
              </div>
              <div className='flex items-center'>
                <FiArrowRight size={16} aria-label='arrow-right-icon' />
              </div>
            </div>

            <div className='flex flex-grow flex-col justify-center gap-2'>
              {payer.payees.map((payee) => (
                <div
                  className='flex items-center justify-between gap-2 md:gap-4'
                  key={payee.payeeId}
                >
                  <div className='flex justify-between gap-3 md:justify-center md:gap-4'>
                    <div className='flex items-center'>
                      <Checkbox
                        className='h-5 w-5'
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
                    </div>
                    <div className='w-24 md:w-auto'>
                      <UserDisplay
                        name={payee.payeeName}
                        icon={payee.payeeIcon}
                        size={28}
                      />
                    </div>
                  </div>
                  <span className='whitespace-nowrap font-medium md:text-lg'>
                    $ {payee.fee}
                  </span>
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
