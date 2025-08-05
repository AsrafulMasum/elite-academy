import { useEffect } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input } from "antd";
import { useUpdateSubscriptionMutation } from "../../redux/features/subscriptionApi";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const EditInputForm = ({ packageData, refetch, setOpenEditModal }) => {
  const [form] = Form.useForm();
  const [updateSubscription, {isLoading}] = useUpdateSubscriptionMutation();

  const onFinish = async (values) => {
    const { name, duration, price, features } = values;
    const payload = {
      name,
      price: parseInt(price),
      features,
      duration,
    };
    const res = await updateSubscription({
      id: packageData?._id,
      body: payload,
    })
      .unwrap()
      .catch((error) => {
        console.error("Failed to update package:", error);
        toast.error("Failed to update package. Please try again.");
      });

    if (res?.success) {
      refetch();
      setOpenEditModal(false);
      toast.success("Package updated successfully!");
      form.resetFields();
    }
  };

  useEffect(() => {
    if (packageData) {
      form.resetFields();
      form.setFieldsValue(packageData);
    }
  }, [packageData]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#13333A",
        },
      }}
    >
      <Form
        form={form}
        name="no_labels_form"
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        style={{ marginTop: 24, marginLeft: 12, marginRight: 12 }}
      >
        {/* Static Fields */}
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input package name!" }]}
        >
          <Input
            placeholder="Package Name"
            style={{ height: 48, width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="duration"
          rules={[{ required: true, message: "Please input package fees!" }]}
        >
          <Input
            placeholder="Package Duration"
            style={{ height: 48, width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="price"
          rules={[{ required: true, message: "Please input package price!" }]}
        >
          <Input
            placeholder="Package Price"
            style={{ height: 48, width: "100%" }}
          />
        </Form.Item>

        {/* Dynamic Package Details Fields */}
        <Form.List
          name="features"
          rules={[
            {
              validator: async (_, packageDetails) => {
                if (!packageDetails || packageDetails.length < 1) {
                  return Promise.reject(new Error("At least 1 field"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field) => (
                <Form.Item
                  required={false}
                  key={field.key}
                  {...formItemLayoutWithOutLabel}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            "Please input package detail or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="Package Details"
                        style={{ height: 48, width: "100%" }}
                      />
                    </Form.Item>
                    {fields.length > 1 && (
                      <MinusCircleOutlined
                        onClick={() => remove(field.name)}
                        style={{
                          color: "red",
                          fontSize: 18,
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </div>
                </Form.Item>
              ))}

              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ width: "100%", height: 48 }}
                >
                  Add field for package details
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Submit Button */}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              height: 48,
              width: "100%",
              backgroundColor: "#2E7A8A",
              fontSize: "18px",
            }}
          >
            {isLoading && <ImSpinner9 size={20} className="animate-spin" />}
            {isLoading ? "Submitting" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default EditInputForm;
