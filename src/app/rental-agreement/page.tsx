import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rental Agreement",
  description:
    "Terms and conditions for renting Cottage Creators properties in Muskoka.",
};

export default function RentalAgreement() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-stone-900 mb-2">
        Rental Agreement
      </h1>
      <p className="text-stone-500 mb-8">
        Hosts: Shari &amp; David van de Pol &middot; 1093 Sutton Rd. #3
        Utterson, ON, P0B 1M0 &middot; info@cottagecreators.ca
      </p>

      <div className="prose prose-stone max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-stone-900">1. Fees</h2>
          <p>
            Payment of fees for the stay are due at the time of booking unless
            previously arranged.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">2. Pets</h2>
          <p>
            The property welcomes animals with advance approval. Pet owners must
            clean up after their animals, with dog waste disposed in garbage
            bins.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            3. Cancellation Policy
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Full refund within 48 hours of booking if check-in is 14+ days
              away
            </li>
            <li>
              50% refund if cancellation occurs 7+ days before check-in
            </li>
            <li>No refunds for cancellations within 7 days of check-in</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            4. Additional Guests
          </h2>
          <p>
            Total occupants visiting during the rental period must match the
            booking count. If you have 4 guests, and two of them stay one night
            and leave, and two others come — that is 6 people entering the
            property.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            5. Number of Guests
          </h2>
          <p>
            Maximum overnight guests: 8 at Water&apos;s Edge, 6 at Muskoka Nest
            or Cabana. In the event the number of overnight guests exceeds the
            said maximum number, the Guest shall pay to the Host $200.00 per
            night per overnight guest over the maximum number and may result in
            immediate termination.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            6. Security Deposit
          </h2>
          <p>
            The Security Deposit of $500 will be held for the observance and due
            performance of the terms and conditions of this Agreement. Damage
            assessments occur within 14 days post-departure. The cleaning fee
            covers standard cleaning and laundry; extraordinary cleaning
            addresses excessive waste, improper garbage disposal, or significant
            staining.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            7. Rental Period
          </h2>
          <p>
            The rental period shall be the period commencing on the Arrival Date
            and ending on the Departure Date, unless terminated in accordance
            with the provisions of this Agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            8. Check-in and Check-out
          </h2>
          <p>
            The Guest shall check in no earlier than 4 pm on the Arrival Date
            and check out no later than 10 am on the Departure Date unless
            previously arranged in writing with the host. No access outside
            these times.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            9. Telephone/Internet
          </h2>
          <p>
            Guests must use personal cellular phones. Unlimited internet is
            provided. The Wi-Fi password will be provided to you on the day that
            you check into the Property. Internet cannot be used for illegal
            activities; violations result in immediate termination without
            refund. Service operates on a best-effort basis and is not
            guaranteed.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            10. Use of Property by Guest
          </h2>
          <p>Guests must:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Maintain the Property at all times in a good and tidy condition
            </li>
            <li>
              No smoking or vaping indoors; smoking permitted outside only
            </li>
            <li>
              Avoid creating nuisances or excessive noise after 11 p.m.
            </li>
            <li>Properly operate equipment and appliances</li>
            <li>Not rearrange furniture</li>
            <li>Avoid flushing non-toilet paper items</li>
            <li>Not sit on furniture in wet bathing suits</li>
            <li>Comply with local laws</li>
            <li>
              Leave property in same cleanliness condition as arrival
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            11. Maintenance by Host
          </h2>
          <p>
            Contact: info@cottagecreators.ca. The Host does not
            guarantee the operation of any piece of equipment, machinery, or
            appliance serving the Property, and there shall be no discount to or
            refund of any portion of the Rental Rate for failure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            12. Access by Host or Agent
          </h2>
          <p>
            The Host or an Agent for the Host shall be entitled to access the
            Property upon reasonable notice during the Rental Period for the
            purposes of supplying services, effecting maintenance or repairs, and
            performing inspections.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            13. Damage and Replacements
          </h2>
          <p>
            Guests must report damage upon arrival or occurrence. The Guest
            shall be responsible for any damage to or loss from the Property
            which occurs during the Rental Period. Inspection occurs within 14
            days of departure; charges reflect repair or replacement value.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">14. Waste</h2>
          <p>
            The Guest and the Guest&apos;s guests shall temporarily place all
            garbage and recycling in the garbage bin next to the 1093 sign on
            the road leading in to the cottage. Improper placement in
            neighbours&apos; bins incurs a $100 fee. All waste must depart with
            guests.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            15. Waterfront Activities
          </h2>
          <p>
            Children under 18 require adult supervision for watercraft. The
            Guest is liable for all waterfront activities and shall be engaged
            in by the Guest and all Guests at own risk. Winter activities (ice
            fishing, skating) are at the guest&apos;s own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            16. Indemnity
          </h2>
          <p>
            The Guest shall indemnify and save the Host and the Host&apos;s
            Agent, harmless from and against any liabilities or any loss or
            damage whatsoever arising from, related to or in connection with the
            Guest&apos;s rental of the Property.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            17. Termination by Owner
          </h2>
          <p>
            The Host or the Host&apos;s Agent shall be entitled to terminate
            this Agreement if the Guest, or any of the Guest&apos;s guests, are
            in violation of any of the terms of this Agreement or, in the sole
            opinion of the Host or the Host&apos;s Agent, if the Guest or any
            of the Guest&apos;s guests&apos; use of the property is detrimental
            to the Property or creates a nuisance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            18. Personal Information
          </h2>
          <p>
            Renters consent to the owner obtaining information necessary for the
            application or rental period. Renters consent to reasonable
            assessment steps, including consumer/credit reports. Renters consent
            to disclosure of information to credit reporting agencies. Personal
            information provided by the Renter to the Owner or the Owner&apos;s
            Agent will be used only for the purpose of this rental application.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            19. Agreement
          </h2>
          <p>
            By agreeing to this in the booking application, I have read,
            understand and agree to abide by the Terms and Conditions as set out
            above. Guests acknowledge the host bears no liability for loss or
            injury during rental.
          </p>
        </section>
      </div>
    </div>
  );
}
