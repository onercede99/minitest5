class NhanVienPartTime extends NhanVien{
    private double timeWork;

    public NhanVienPartTime(double timeWork) {
        this.timeWork = timeWork;
    }

    public NhanVienPartTime(int id, String name, int age, String phoneNumber, String emailAddress, double timeWork) {
        super(id, name, age, phoneNumber, emailAddress);
        this.timeWork = timeWork;
    }
    public NhanVienPartTime() {
    }

    @Override
    public double getSalary() {
        return timeWork*100;
    }

    @Override
    public String toString() {
        return "NhanVienPartTime " + super.toString() +
                ", timeWork= " + timeWork ;
    }
}
