import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useGetMoneyQuery } from "../../redux/api/moneyApi/moneyApi";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { AddCircleOutlineOutlined, Close } from "@mui/icons-material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Deposit = () => {
  const [addBalance, setAddBalance] = useState(false);
  const { user } = useSelector(({ auth }) => auth);
  const { data } = useGetMoneyQuery(user?.email);
  const { control, handleSubmit } = useForm({
    defaultValues: { money: data?.balance || 0 },
    resolver: yupResolver(
      yup.object().shape({
        money: yup
          .number()
          .min(1)
          .typeError("Money is Required")
          .required("Money is Required"),
      })
    ),
  });

  const onsubmit = (data) => console.log(data);
  return (
    <>
      <Stack
        bgcolor={grey[200]}
        my={2}
        padding={7}
        borderRadius={2}
        boxShadow={4}
      >
        <Typography variant="h2" fontSize={100} color="success.light">
          BDT : {data?.money || 0}
        </Typography>
      </Stack>

      <Button
        startIcon={addBalance ? <Close /> : <AddCircleOutlineOutlined />}
        variant="contained"
        color={addBalance ? "error" : "secondary"}
        onClick={() => setAddBalance(!addBalance)}
      >
        {addBalance ? "Cancel" : "Deposit Money"}
      </Button>

      {addBalance && (
        <Stack
          onSubmit={handleSubmit(onsubmit)}
          spacing={2}
          direction="row"
          component="form"
          border={1}
          borderRadius={2}
          padding={2}
          my={2}
          borderColor={grey[300]}
        >
          <Controller
            name="money"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextField
                label="Amount"
                type="number"
                value={value}
                onChange={onChange}
                required
                error={!!error}
                helperText={error && error.message}
                name="numberformat"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">BDT</InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Button type="submit" color="secondary" variant="contained">
            Deposit Money
          </Button>
        </Stack>
      )}
    </>
  );
};

export default Deposit;
