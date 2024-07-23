import { NextRequest, NextResponse } from "next/server";
import Ticket from "@/libs/model/ticket.model";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  console.log("Fetching UserID records: ", userId);
  return NextResponse.json({
    tickets: [
      {
        query:
          "How can I create a saved search to identify items that are below their reorder point?",
        solution: `
      1. Go to Lists > Search > Saved Searches > New.
      2. Select 'Item' as the type of search.
      3. In the Criteria tab, add the following filters:
         - 'Reorder Point' (under Inventory Fields) - set the condition to 'greater than' and the value to 0.
         - 'Available' (under Inventory Fields) - set the condition to 'less than' and the value to 'Reorder Point'.
      4. In the Results tab, select the fields you want to display, such as 'Item Name', 'Available', 'Reorder Point', etc.
      5. Save and run the search.
      `,
      },
      {
        query:
          "How can I automate the creation of invoices from sales orders in NetSuite?",
        solution: `
        1. Navigate to Customization > Scripting > Script Deployments > New.
        2. Select 'User Event' as the type of script.
        3. Write a User Event script that triggers on the 'After Submit' event of Sales Orders.
        4. In the script, use the nlapiTransformRecord function to transform the Sales Order into an Invoice.
           \`\`\`javascript
           function afterSubmit(context) {
             var salesOrder = context.newRecord;
             if (salesOrder.getFieldValue('status') === 'Pending Fulfillment') {
               var invoice = nlapiTransformRecord('salesorder', salesOrder.getId(), 'invoice');
               nlapiSubmitRecord(invoice);
             }
           }
           \`\`\`
        5. Deploy the script to Sales Orders.
        `,
      },
      {
        query: "How can I add a custom field to customer records in NetSuite?",
        solution: `
        1. Navigate to Customization > Lists, Records, & Fields > Entity Fields > New.
        2. Choose 'Customer' as the record type.
        3. Enter the necessary details for the custom field, such as label, type, and ID.
        4. Set any desired display, validation, or defaulting options.
        5. Save the custom field.
        6. The custom field will now be available on customer records.
        `,
      },
      {
        query:
          "How can I set up a workflow to send an email notification when a sales order is approved?",
        solution: `
        1. Navigate to Customization > Workflow > Workflows > New.
        2. Enter the basic details for the workflow, such as name and record type (Sales Order).
        3. Add a new state and name it 'Send Email'.
        4. Add a new action to the 'Send Email' state:
           - Choose 'Send Email' as the action type.
           - Configure the recipient, subject, and body of the email.
        5. Set a transition from the initial state to the 'Send Email' state based on the condition 'Status = Approved'.
        6. Activate and save the workflow.
        `,
      },
    ],
  });
};

export const POST = async (req: NextRequest) => {
  const { threadId, query } = await req.json();

  console.log("ThreadId, query", threadId, query);

  //   if (!threadId || !userQuery) {
  //     return NextResponse.json(
  //       {
  //         error: "Fields are missing.",
  //       },
  //       {
  //         status: 400,
  //       }
  //     );
  //   }

  //   const newTicket = new Ticket({
  //     threadId: threadId,
  //     query: userQuery,
  //   });

  //   await newTicket.save();

  //   return NextResponse.json(
  //     {
  //       ticket: newTicket,
  //       message:
  //         "Ticket has generated Support Team will resolve your issue or will contact you",
  //     },
  //     {
  //       status: 200,
  //     }
  //   );

  return NextResponse.json(
    {
      message: "User query ticket is placeds",
    },
    {
      status: 200,
    }
  );
};
