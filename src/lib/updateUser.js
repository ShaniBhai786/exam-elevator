export async function PUT(req) {
    try {
        await verifyAdmin(req);

        const { id, ...data } = await req.json();

        const updatedUser = await User.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        return NextResponse.json({
            success: true,
            data: updatedUser,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 403 }
        );
    }
}